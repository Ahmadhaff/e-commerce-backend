import express from 'express';
import { Types } from 'mongoose';
import { ProtectedRequest } from '../types/app-request.d';
import schema from './schema';
import UserRepo from '../database/repository/UserRepos';
import KeystoreRepo from '../database/repository/KeystoreRepo';
import validator, { ValidationSource } from '../helpers/validator';
import { AuthFailureError, AccessTokenError, TokenExpiredError } from '../core/ApiError';
import asyncHandler from '../helpers/asyncHandler';
import jwt from 'jsonwebtoken'; 

const router = express.Router();

export const getAccessToken = (authorization?: string) => {
  if (!authorization) throw new AuthFailureError('Invalid Authorization');
  if (!authorization.startsWith('Bearer ')) throw new AuthFailureError('Invalid Authorization');
  return authorization.split(' ')[1];
};
export default router.use(
  validator(schema.auth, ValidationSource.HEADER),
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    req.accessToken = getAccessToken(req.headers.authorization); 
    
    try {
      // Utiliser jwt.decode pour obtenir le payload du token
      const payload = jwt.decode(req.accessToken) as { email: string, id: string, exp?: number };
      console.log('Decoded Access Token:', payload);

      // Valider les données du payload 
      if (!payload || !payload.email || !payload.id) {
        throw new AuthFailureError('Invalid access token');
      }

      // Vérifier si l'utilisateur existe par email
      const user = await UserRepo.findByEmail(payload.email);
      if (!user) throw new AuthFailureError('User not registered');
      req.user = user;

      // Vérifier si le keystore contient le token
      const keystore = await KeystoreRepo.findforKey(req.user._id, payload.email);
      if (!keystore) throw new AuthFailureError('Invalid access token');
      req.keystore = keystore;

      // Vérifier si le token a expiré
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        throw new TokenExpiredError('Token has expired');
      }

      return next();
    } catch (e) {
      if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
      throw e;
    }
  }),
);



