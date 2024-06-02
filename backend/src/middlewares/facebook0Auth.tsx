import passport from 'passport';
import { Strategy as FacebookStrategy, Profile } from 'passport-facebook';
import UserRepo from '../database/repository/UserRepos';
import RoleRepo from '../database/repository/RoleRepos';
import KeystoreRepo from '../database/repository/KeystoreRepo';
import { InternalError } from '../core/ApiError';
import User, { UserModel } from '../database/model/User';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID!,
  clientSecret: process.env.FACEBOOK_APP_SECRET!,
  callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`,
  profileFields: ['id', 'emails', 'name', 'photos']
},
async (accessToken, refreshToken, profile: Profile, done) => {
  try {
    const email = profile.emails && profile.emails[0].value;
    const facebookId = profile.id;
    if (!email) {
      return done(new InternalError('Email is missing in the Facebook profile'), false);
    }

    let user = await UserRepo.findByFacebookId(facebookId);
    if (!user) {
      user = await UserRepo.findByEmail(email);
    }

    if (!user) {
      const defaultRole = await RoleRepo.findByCode('USER');
      if (!defaultRole) {
        return done(new InternalError('Default role not found'), false);
      }

      const newUser = new UserModel({
        firstname: profile.name?.givenName || '',
        lastname: profile.name?.familyName || '',
        email: email,
        profilePicUrl: profile.photos && profile.photos[0].value,
        facebookId: facebookId,
        password: '',
        role: defaultRole._id,
      });

      const createdUser = await newUser.save();
      user = createdUser;
    } else if (!user.facebookId) {
      user.facebookId = facebookId;
      if (!(user instanceof UserModel)) {
        user = new UserModel(user);
      }
      await user.save();
    }

    const accessToken = jwt.sign({ email: user.email, id: user._id.toString(), role: user.role, firstname: user.firstname, lastname: user.lastname}, "jwt-access-token-secret-key", { expiresIn: '1h' });
    const refreshToken = jwt.sign({ email: user.email, firstname: user.firstname, lastname: user.lastname }, "jwt-refresh-token-secret-key", { expiresIn: '24h' });

    await KeystoreRepo.create(user._id, accessToken, refreshToken);

    return done(null, user, { accessToken, refreshToken });
  } catch (err) {
    return done(err as InternalError, false);
  }
}));

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const objectId = new Types.ObjectId(id);
    const user = await UserRepo.findById(objectId);
    done(null, user);
  } catch (err) {
    done(err as InternalError, null);
  }
});

export default passport;