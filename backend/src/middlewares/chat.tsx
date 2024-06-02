import { DataRequest, ProtectedDataRequest } from '../types/app-request.d';
import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { NotFoundError } from '../core/ApiError';
import ChatRepos from '../database/repository/ChatRepos';
import asyncHandler from '../helpers/asyncHandler';

export const checkChat = asyncHandler(async (req: DataRequest, res: Response, next) => {
  const isChatExist = await ChatRepos.findById(new Types.ObjectId(req.params.id));
  if (!isChatExist) {
    return next(new NotFoundError('Chat not found'));
  }
  req.chat = isChatExist;
  console.log('postexiste',req.post)
  next();
});