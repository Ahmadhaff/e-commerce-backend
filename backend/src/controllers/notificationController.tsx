import MessageRepo from '../database/repository/MessageRepos';
import { DataRequest, ProtectedDataRequest, ProtectedRequest } from '../types/app-request.d';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import ChatRepo from '../database/repository/ChatRepos';
import UserRepo from '../database/repository/UserRepos';
import NotificationRepo from '../database/repository/NotificationRepos';
import asyncHandler from '../helpers/asyncHandler';
import { AuthFailureError, BadRequestError,InternalError } from '../core/ApiError';
import { SuccessMsgResponse, SuccessResponse} from '../core/ApiResponse';
import PostRepo from '../database/repository/PostRepos';
import _ from 'lodash';
import { Types } from 'mongoose';

export const createNotification = asyncHandler(async (req: ProtectedDataRequest, res: Response) => {
  const user = await UserRepo.findProfileById(req.user._id);
  if (!user) {
      throw new BadRequestError('User not registered');
  }

  const sourceId = req.user._id;
  const { postId, message, type } = req.body;
  let targetId: Types.ObjectId;
  if (type === 'NEW_POST_TO_CONTROL') {
    const adminUser = await UserRepo.findAdmin();
    if (!adminUser) {
      throw new BadRequestError('Admin user not found');
    }
    targetId = adminUser._id;
  } else {
    const post = await PostRepo.findById(postId);
    if (!post) {
      throw new BadRequestError('Post not found');
    }
    targetId = post.author._id;
  }
  
  try {
      const newNotification = await NotificationRepo.create(sourceId, targetId, postId, message, type);
      return new SuccessResponse('Notification created successfully', newNotification).send(res);
  } catch (error) {
      console.error('Error creating notification:', error);
      throw new InternalError('Server error while creating notification');
  }
});


import { ParsedQs } from 'qs';

export const findUserNotification = asyncHandler(async (req: ProtectedDataRequest, res: Response) => {
  const user = await UserRepo.findProfileById(req.user._id);
  if (!user) {
    throw new BadRequestError('User not registered');
  }
  console.log(user);
  const userId = req.user._id;

  // Convertir req.query.type en un tableau de chaînes de caractères
  const typeQuery = req.query.type;
  let types: string[] | undefined;

  if (typeQuery) {
    if (Array.isArray(typeQuery)) {
      types = typeQuery.map(type => String(type)); // Convertir chaque élément en chaîne de caractères
    } else {
      types = [String(typeQuery)]; // Convertir en tableau avec un seul élément
    }
  }

  try {
    const notifications = await NotificationRepo.find({ targetId: userId }, types);
    return new SuccessResponse('All notifications are returned successfully', notifications).send(res);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


export const updateNotification = asyncHandler(async (req: ProtectedRequest, res) => {
    const notification = await NotificationRepo.findByObj({ _id: new Types.ObjectId(req.params.id), deletedAt: null });
    if (!notification) {
        throw new BadRequestError('Notification not found');
    }
    notification.isRead = true;
    const updatedNotification = await NotificationRepo.updateInfo(notification);

    return new SuccessResponse('Notification updated successfully', updatedNotification).send(res);
});


export const markAllNotificationAsRead = asyncHandler(async (req: ProtectedRequest, res) => {
  const notification = await NotificationRepo.findByObj({ _id: new Types.ObjectId(req.params.id), deletedAt: null });
  if (!notification) {
      throw new BadRequestError('Notification not found');
  }
  notification.isRead = true;
  const updatedNotification = await NotificationRepo.updateInfo(notification);

  return new SuccessResponse('Notification updated successfully', updatedNotification).send(res);
});





       
