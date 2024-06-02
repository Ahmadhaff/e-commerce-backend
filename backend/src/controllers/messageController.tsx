import MessageRepo from '../database/repository/MessageRepos';
import { DataRequest, ProtectedDataRequest, ProtectedRequest } from '../types/app-request.d';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import ChatRepo from '../database/repository/ChatRepos';
import UserRepo from '../database/repository/UserRepos';
import PostRepo from '../database/repository/PostRepos';
import asyncHandler from '../helpers/asyncHandler';
import { AuthFailureError, BadRequestError } from '../core/ApiError';
import { SuccessMsgResponse, SuccessResponse} from '../core/ApiResponse';

export const createMessage = asyncHandler(async (req: ProtectedDataRequest, res)=> {
    const user = await UserRepo.findProfileById(req.user._id);
    if (!user) {
        throw new BadRequestError('User not registered');
    }
    console.log(user);
    const senderId = req.user._id; 
    const { chatId, text} = req.body;
    const message = await MessageRepo.create(chatId, senderId, text);
    return new SuccessResponse('message created successfully',message).send(res);
});


export const getMessages = asyncHandler(async (req, res) => {
    const { chatId} = req.params;
    try {
    const messages = await MessageRepo.find({ chatId });
    return new SuccessResponse('all massages are returned successfully',messages).send(res);
    } catch (error) {
    console.log(error);
    res.status(500).json(error);
    }
});

export const deleteMessage = asyncHandler(async (req: ProtectedDataRequest, res: Response) => {
    const deleteMessage = await MessageRepo.deleteMessage(req.message);
    new SuccessResponse('this message is deleted successfully', deleteMessage).send(res);
  });
