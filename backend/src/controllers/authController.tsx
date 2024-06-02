import { ProtectedRequest, RoleRequest, Tokens} from '../types/app-request.d';
import bcryptjs from 'bcryptjs';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { AuthFailureError, BadRequestError,InternalError } from '../core/ApiError';
import { SuccessMsgResponse, SuccessResponse} from '../core/ApiResponse';
import { RoleCode } from '../database/model/Role';
import User from '../database/model/User';
import KeystoreRepo from '../database/repository/KeystoreRepo';
import UserRepo from '../database/repository/UserRepos';
import asyncHandler from '../helpers/asyncHandler';
import bcrypt from 'bcrypt';
//login
export const login = asyncHandler(async (req, res) => {
  console.log('req.body?email', req.body.email);
  let user = await UserRepo.findByEmail(req.body.email);
  console.log("user11", user);
  if (!user) throw new BadRequestError('User not registered');
  // Vérifier si l'utilisateur est bloqué
  if (user.isBlocked) throw new AuthFailureError('User is blocked');
  if (!user.password) throw new BadRequestError('Credential not set');

  const match = await bcryptjs.compare(req.body.password, user.password);
  console.log("match", match);
  if (!match) throw new AuthFailureError('password incorrect');
  console.log("user role", user.role);
  const accessToken = jwt.sign({ email: user.email, id: user._id.toString(), role: user.role, firstname: user.firstname, lastname: user.lastname}, "jwt-access-token-secret-key", { expiresIn: '1h' });
  const refreshToken = jwt.sign({ email: user.email ,firstname: user.firstname, lastname: user.lastname }, "jwt-refresh-token-secret-key", { expiresIn: '24h' });

  // Décoder et afficher le contenu du token
  const decodedAccessToken = jwt.decode(accessToken);
  console.log('Decoded Access Token:', decodedAccessToken);

  const keystore = await KeystoreRepo.create(user._id, accessToken, refreshToken);
   console.log("keystore",keystore);
  new SuccessResponse('Login Success', {
    CreateUser: _.pick(user, ['_id', 'firstname', 'email', 'role','profilePicUrl']),
    accessToken,
    refreshToken,
  }).send(res);
});

//reset password 
export const resetPassword = asyncHandler(async (req, res)  => {
  const {newPassword } = req.body;
  //const {email} = req.email;
  console.log('New Password:', newPassword);
  
  const user = await UserRepo.findByEmail(req.body.email);
  //console.log('email:', email);
  if (!user) throw new BadRequestError('User not registered');
  // Validate the current password
  // Hash the new password
  const hashedNewPassword = await bcrypt.hash(newPassword, 12);
  console.log('Hashed New Password:', hashedNewPassword);
  // Update user's password with the new hashed password
  user.password = hashedNewPassword;
  
  // Save the updated user profile
  await UserRepo.updateInfo(user);
  return new SuccessResponse(
    'Password updated successfully',
    _.pick(user, ['password'])
  ).send(res);
});  
 
//signup
export const signup = asyncHandler(async (req: RoleRequest, res) => {
    let user = await UserRepo.findByEmail(req.body.email);
    if (user) throw new BadRequestError('User already registered');
  
    const { user: createdUser } = await UserRepo.create(
      {
        ...req.body,
      } as User,
      
      RoleCode.USER,
  );
  console.log("creation",createdUser);
  new SuccessResponse('Signup Successful', {
    user: _.pick(createdUser, ['_id', 'firstname', 'email', 'role']),
  }).send(res);
});  

// refreshToken
export const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log('reftoken',refreshToken)
  if (!refreshToken) {
    throw new BadRequestError('Refresh token missing');
  }

  // Vérifiez si le refresh token est valide
  let decodedRefreshToken;
  console.log('deco',decodedRefreshToken)
  try {
    console.log('deco',decodedRefreshToken)
    decodedRefreshToken = jwt.verify(refreshToken, "jwt-refresh-token-secret-key") as { email: string };
    console.log('deco',decodedRefreshToken)
  } catch (error) {
    throw new AuthFailureError('Invalid refresh token');
  }

  // Vérifiez si l'utilisateur associé au refresh token existe
  const user = await UserRepo.findByEmail(decodedRefreshToken.email);
  if (!user) {
    throw new AuthFailureError('User not found');
  }

  // Vérifiez si le keystore contient le refresh token
  const keystore = await KeystoreRepo.find(user._id, refreshToken);
  if (!keystore) {
    throw new AuthFailureError('Invalid refresh token');
  }

  // Générer un nouveau access token
  const newAccessToken = jwt.sign({ email: user.email, id: user._id, role: user.role, firstname: user.firstname, lastname: user.lastname }, "jwt-access-token-secret-key", { expiresIn: '1h' });
  const newRefreshToken = jwt.sign({ email: user.email,firstname: user.firstname, lastname: user.lastname }, "jwt-refresh-token-secret-key", { expiresIn: '24h' });
  // Mettre à jour le keystore avec le nouveau access token
  await KeystoreRepo.update(keystore._id, { accessToken: newAccessToken, refreshToken:newRefreshToken });

  new SuccessResponse('Token Refreshed', {
    accessToken: newAccessToken,
    refreshToken:newRefreshToken
  }).send(res);
});

//logout
export const logout = asyncHandler(async (req: ProtectedRequest, res) => {
  await KeystoreRepo.remove(req.keystore._id);
  console.log('key',req.keystore._id)
  new SuccessMsgResponse('Logout success').send(res);
  
});
