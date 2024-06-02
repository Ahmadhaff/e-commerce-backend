import ReclamationRepo from '../database/repository/ReclamationRepos';
import { DataRequest, ProtectedDataRequest, ProtectedRequest } from '../types/app-request.d';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import UserRepo from '../database/repository/UserRepos';
import asyncHandler from '../helpers/asyncHandler';
import { AuthFailureError, BadRequestError } from '../core/ApiError';
import { SuccessMsgResponse, SuccessResponse} from '../core/ApiResponse';

export const createReclamation = asyncHandler(async (req: ProtectedDataRequest, res)=> {
    const user = await UserRepo.findProfileById(req.user._id);
    if (!user) {
        throw new BadRequestError('User not registered');
    }
    console.log(user);
    const senderId = req.user._id; 
    console.log(user);
    const { email,fullname,text} = req.body;
    const message = await ReclamationRepo.create( senderId, email, fullname, text);
    return new SuccessResponse('reclamation created successfully',message).send(res);
});


export const getAllReclamations = asyncHandler(async(req: Request, res:Response) => {
    const { page, perPage, deleted } = req.query;
    
    const options = {
      page: parseInt(page as string, 10) || 1,
      limit: parseInt(perPage as string, 10) || 10,
    };
    const posts = await ReclamationRepo.findAll(options, req.query, { 
      isPaging: true,
      deleted: deleted == 'true' ? true : false,
    });
    const { docs, ...meta} = posts;
    new SuccessResponse('All Reclamations returned successfully', { docs, meta }).send(res);
});
  

/*
export const getReclamation = asyncHandler(async (req, res) => {
    const { chatId} = req.params;
    try {
    const reclamations = await ReclamationRepo.find({ chatId });
    return new SuccessResponse('all reclamations are returned successfully',reclamations).send(res);
    } catch (error) {
    console.log(error);
    res.status(500).json(error);
    }
});

export const deleteReclamation = asyncHandler(async (req: ProtectedDataRequest, res: Response) => {
    const deleteReclamation = await ReclamationRepo.deleteMessage(req.reclamation);
    new SuccessResponse('this message is deleted successfully', deleteReclamation).send(res);
  });*/
