import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import UserRepo from '../database/repository/UserRepos';
import RoleRepo from '../database/repository/RoleRepos'; // Assurez-vous d'importer le référentiel de rôles
import { InternalError } from '../core/ApiError';
import User, { UserModel } from '../database/model/User';
import KeystoreRepo from '../database/repository/KeystoreRepo';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
},
async (accessToken, refreshToken, profile: Profile, done) => {
  try {
    const email = profile.emails && profile.emails[0].value;
    const googleId = profile.id;
    if (!email) {
      return done(new InternalError('Email is missing in the Google profile'), false);
    }

    let user = await UserRepo.findByGoogleId(googleId);
    if (!user) {
      user = await UserRepo.findByEmail(email);
    }

    if (!user) {
      const defaultRole = await RoleRepo.findByCode('USER'); // Assurez-vous d'avoir un rôle 'USER' dans votre collection des rôles
       
      if (!defaultRole) {
        return done(new InternalError('Default role not found'), false);
      }
    
      const newUser = new UserModel({
        firstname: profile.name?.givenName || '',
        lastname: profile.name?.familyName || '',
        email: email,
        profilePicUrl: profile.photos && profile.photos[0].value,
        googleId: googleId, // Enregistrement du googleId
        password: '', // Leave password empty for OAuth users
        role: defaultRole._id, // Assignez le rôle par défaut
      });

      const createdUser = await newUser.save();
      user = createdUser;
    } else if (!user.googleId) {
      user.googleId = googleId;

      // Convertir user en instance de UserModel si ce n'est pas déjà le cas
      if (!(user instanceof UserModel)) {
        user = new UserModel(user);
      }

      await user.save();
    }
    const accessToken = jwt.sign({ email: user.email, id: user._id.toString(), role: user.role, firstname: user.firstname, lastname: user.lastname}, "jwt-access-token-secret-key", { expiresIn: '1h' });
    const refreshToken = jwt.sign({ email: user.email ,firstname: user.firstname, lastname: user.lastname }, "jwt-refresh-token-secret-key", { expiresIn: '24h' });

  // Décoder et afficher le contenu du token
  //const decodedAccessToken = jwt.decode(accessToken);
  //console.log('Decoded Access Token:', decodedAccessToken);
    console.log('Creating keystore entry...');
    const keystore = await KeystoreRepo.create(user._id, accessToken, refreshToken);
    console.log('Keystore created:', keystore);

    //await KeystoreRepo.create(user._id, accessToken, refreshToken);

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
