import { ProtectedRequest } from "../types/app-request.d";
import { Types } from 'mongoose';
import { BadRequestError } from '../core/ApiError';
import { SuccessResponse } from "../core/ApiResponse";
import KeystoreRepo from "../database/repository/KeystoreRepo";
import UserRepo from "../database/repository/UserRepos";
import asyncHandler from "../helpers/asyncHandler";
import _ from 'lodash';

export const getAllUsers = asyncHandler(async (req: ProtectedRequest, res) => {
    const { page, perPage, deleted } = req.query;
    const options = {
      page: parseInt(page as string, 10) || 1,
      limit: parseInt(perPage as string, 20) || 20,
    };
   
    const users = await UserRepo.findAll(options, req.query, {
        isPaging: true,
        deleted: deleted == 'true' ? true : false
    });
   
    const { docs, ...meta } = users; 
    new SuccessResponse('All users returned successfully', {
        docs,
        meta
      }).send(res);
});

export const getUser = asyncHandler(async (req: ProtectedRequest, res) => {
  const user = await UserRepo.findByObj({ _id: new Types.ObjectId(req.params.id),deletedAt: null});
  if (!user) 
  throw new BadRequestError('User not registered or deleted');
  return new SuccessResponse('success', _.pick(user, ['firstname','lastname','email', 'profilePicUrl'])).send(res);
});

export const deleteUser = asyncHandler(async (req: ProtectedRequest, res) => {
    const user = await /*UserRepo.findProfileById(req.user._id);*/UserRepo.findByObj({ _id: new Types.ObjectId(req.params.id),deletedAt: null});
    console.log('user',user) 
    if (!user) throw new BadRequestError('User not registered or deleted');
    await KeystoreRepo.remove(user._id);
    let deletedUser = await UserRepo.deleteUser(user);
    return new SuccessResponse(
      'User Deleted',
      deletedUser,
    ).send(res);
});

export const blockUser = asyncHandler(async (req: ProtectedRequest, res) => {
  const user = await UserRepo.findByObj({ _id: new Types.ObjectId(req.params.id),deletedAt: null});
  if (!user) 
  throw new BadRequestError('User not registered or deleted');
  user.isBlocked = true;
  await UserRepo.updateInfo(user);
  return new SuccessResponse('User blocked successfully', 
  _.pick(user, ['firstname', 'lastname', 'email', 'isBlocked'])).send(res);
});


export const unblockUser = asyncHandler(async (req: ProtectedRequest, res) => {
  const user = await UserRepo.findByObj({ _id: new Types.ObjectId(req.params.id),deletedAt: null});
  if (!user) 
  throw new BadRequestError('User not registered or deleted');
  console.log("user",user);
  user.isBlocked = false;
  await UserRepo.updateInfo(user);
  return new SuccessResponse('User unblocked successfully', 
  _.pick(user, ['firstname', 'lastname', 'email', 'isBlocked'])).send(res);
});