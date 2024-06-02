import { Types } from 'mongoose';
import { DataRequest, ProtectedDataRequest, ProtectedRequest } from '../types/app-request.d';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { StatusEnum } from  '../database/model/Post';
import { BadRequestError } from '../core/ApiError';
import { SuccessResponse ,InternalErrorResponse} from '../core/ApiResponse';
import PostRepos from '../database/repository/PostRepos';
import asyncHandler from '../helpers/asyncHandler';
import { request } from 'http';
import UserRepo from '../database/repository/UserRepos';
import FavoriteRepo  from  '../database/repository/FavoriteRepos'; 
import _ from 'lodash';

export const likePost = asyncHandler(async (req: ProtectedDataRequest, res)=> {
    const user = await UserRepo.findProfileById(req.user._id);
    if (!user) {
        throw new BadRequestError('User not registered');
    }
    console.log(user);
    const userId = req.user._id;  
    const postId = new Types.ObjectId(req.post._id); 
  
    const newFavorite = await FavoriteRepo.create(userId, postId);
  //  return new SuccessResponse('Post liked', {}).send(res);

    return new SuccessResponse('Post liked',newFavorite).send(res);
});



/*
export const unlikePost = asyncHandler(async (req: ProtectedDataRequest, res: Response) => {
  const user = await UserRepo.findProfileById(req.user._id);
  if (!user) throw new BadRequestError('User not registered');

  const favorite = await FavoriteRepo.findByObj({ userId: req.user._id });
  if (favorite) {
    const index = favorite.annonceId.indexOf(req.post._id);
    if (index !== -1) {
      favorite.annonceId.splice(index, 1);
      await FavoriteRepo.updateInfo(favorite);
      return new SuccessResponse('Post unliked', {}).send(res);
    } else {
      throw new BadRequestError('User has not liked this post');
    }
  } else {
    throw new BadRequestError('User has no favorite posts');
  }
});*/

export const fetchFavoritePosts = asyncHandler(async (req: ProtectedDataRequest, res: Response) => {
  const user = await UserRepo.findProfileById(req.user._id);
  if (!user) throw new BadRequestError('User not registered');

  const favorite = await FavoriteRepo.findByObj({ userId: req.user._id });
  if (!favorite) throw new BadRequestError('No favorite posts found');

  return new SuccessResponse('Favorite posts fetched successfully', favorite).send(res);
});




