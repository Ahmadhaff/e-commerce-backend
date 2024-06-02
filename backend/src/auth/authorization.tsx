/*import express from 'express';
import { ProtectedRequest } from '../types/app-request.d';
import { AuthFailureError } from '../core/ApiError';
import RoleRepo from '../database/repository/RoleRepos';
import asyncHandler from '../helpers/asyncHandler';
import { Types } from 'mongoose';

const router = express.Router();

router.use(
  asyncHandler(async (req: ProtectedRequest, res, next) => {
    if (!req.user || !req.user.role || !req.currentRoleCode) {
      throw new AuthFailureError('Permission denied');
    }
    
    const role = await RoleRepo.findByCode(req.currentRoleCode);
    if (!role) throw new AuthFailureError('Permission denied');
    /*
    // Check if the user's role matches the required role
    if (!Types.ObjectId.isValid(req.user.role)) {
      throw new AuthFailureError('Invalid role ID');
    }
    
    if (req.user.role.toString() !== role._id.toString()) {
      throw new AuthFailureError('Permission denied');
    }
    //Regular expression to match a valid ObjectId (24 hex characters)
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;

    // Check if the user's role is a valid ObjectId
    if (!objectIdPattern.test(req.user.role.toString())) {
      throw new AuthFailureError('Invalid role ID');
    }

    // Check if the user's role matches the required role
    if (req.user.role.toString() !== role._id.toString()) {
      throw new AuthFailureError('Permission denied');
    }

    return next();
  })
);

*/

