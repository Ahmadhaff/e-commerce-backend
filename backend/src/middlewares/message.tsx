import { DataRequest, ProtectedDataRequest } from '../types/app-request.d';
import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { NotFoundError } from '../core/ApiError';
import MessageRepos from '../database/repository/MessageRepos';
import asyncHandler from '../helpers/asyncHandler';

export const checkMessage = asyncHandler(async (req: DataRequest, res: Response, next) => {
  const isMessageExist = await MessageRepos.findById(new Types.ObjectId(req.params.id));
  if (!isMessageExist) {
    return next(new NotFoundError('Message not found'));
  }
  req.message = isMessageExist;
  console.log('postexiste',req.post)
  next();
});