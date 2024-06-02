import ChatRepo from '../database/repository/ChatRepos';
import UserRepo from '../database/repository/UserRepos';
import PostRepo from '../database/repository/PostRepos';
import { DataRequest, ProtectedDataRequest, ProtectedRequest } from '../types/app-request.d';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import asyncHandler from '../helpers/asyncHandler';
import { AuthFailureError, BadRequestError } from '../core/ApiError';
import { SuccessMsgResponse, SuccessResponse} from '../core/ApiResponse';
const { isValidObjectId } = mongoose;

export const createChat = asyncHandler(async (req: ProtectedDataRequest, res)=> {
    const user = await UserRepo.findProfileById(req.user._id);
    if (!user) {
        throw new BadRequestError('User not registered');
    }
    console.log(user);
    const firstId = req.user._id; 
    console.log("firstId",firstId);
    const postId = req.body.postId; 
    const post = await PostRepo.findById(postId);
    if (!post) {
        throw new BadRequestError('Post not found');
    }
    const secondId = post.author._id; 
    /*if (!isValidObjectId(firstId) || !isValidObjectId(secondId)) {
        throw new BadRequestError('Invalid user IDs');
    }*/
    const newChat = await ChatRepo.create(firstId ,secondId, postId);

    console.log("newChat",newChat);
    return new SuccessResponse('Chat created successfully',newChat).send(res);
});

export const findUserChats = asyncHandler(async (req: ProtectedDataRequest, res)=> {
  const user = await UserRepo.findProfileById(req.user._id);
    if (!user) {
        throw new BadRequestError('User not registered');
    }
    console.log(user);
    const userId = req.user._id; 
    
  try {
    const chats = await ChatRepo.find({ members: { $in: [userId] },});
    return new SuccessResponse('all chats are returned successfully',chats).send(res);
    //res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


export const findChat = asyncHandler(async (req: ProtectedDataRequest, res: Response)=> {
  const {firstId, secondId} = req.params;
  try {
    const chat = await ChatRepo.findOne({ members: { $all: [firstId, secondId] },});
    //res.status(200).json(chat);
    return new SuccessResponse('chat returned successfully',chat).send(res);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export const deleteChat = asyncHandler(async (req: ProtectedDataRequest, res: Response) => {
  const deleteChat = await ChatRepo.deleteChat(req.chat);
  console.log('postdeleted',deleteChat)
  new SuccessResponse('this post is deleted successfully', deleteChat).send(res);
});




