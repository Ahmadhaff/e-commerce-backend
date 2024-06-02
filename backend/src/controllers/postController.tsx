import { DataRequest, ProtectedDataRequest, ProtectedRequest } from '../types/app-request.d';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import _ from 'lodash';
import { Types } from 'mongoose';
import { StatusEnum } from  '../database/model/Post';
import { BadRequestError } from '../core/ApiError';
import { SuccessResponse ,InternalErrorResponse} from '../core/ApiResponse';
import PostRepos from '../database/repository/PostRepos';
import asyncHandler from '../helpers/asyncHandler';
import { request } from 'http';
import UserRepo from '../database/repository/UserRepos';
//import UserRepo from 'src/database/repository/UserRepos';
import PostRepo from '../database/repository/PostRepos';

export const createPost = asyncHandler(async (req: ProtectedRequest, res: Response) => {
  
  const createdPost = await PostRepos.create(req.body, new Types.ObjectId(req.user._id));
  new SuccessResponse(
    'Post is Created successfully',
    _.pick(createdPost, ['_id', 'createdAt', 'author']),
  ).send(res);
});
/*export const createPost = asyncHandler(async (req: ProtectedRequest, res: Response) => {

  if (!req.file) {
    throw new BadRequestError('No image files provided');
  }

  // Utilisez une vérification de type pour req.files
  if (!Array.isArray(req.file)) {
    throw new BadRequestError('Invalid image files provided');
  }
  const images = req.file.map(file => file.path);

  let status;
  if (req.body.action === 'rent') {
    status = StatusEnum.UnRent;
  } else if (req.body.action === 'sell') {
    status = StatusEnum.Sell;
  }

  const postData = {
    ...req.body,
    images: req.file.path,/*images,*/ // Utilisez le chemin de l'image à partir de req.file
    //status
 /* };
  const imagePath = req.file.path;
  const createdPost = await PostRepos.create(postData , new Types.ObjectId(req.user._id));
  new SuccessResponse(
    'Post is Created successfully',
    _.pick(createdPost, ['_id', 'createdAt', 'author','status']),
  ).send(res);
});*/


export const getPost = asyncHandler(async (req: DataRequest, res: Response) => {
  const post = req.post;
  const postInfo = _.omit(post, ['_id', 'createdAt', 'author']);

  return new SuccessResponse('Success', postInfo).send(res);
});  
  


export const getAllPosts = asyncHandler(async(req: Request, res:Response) => {
  const { page, perPage, deleted } = req.query;
  
  const options = {
    page: parseInt(page as string, 10) || 1,
    limit: parseInt(perPage as string, 10) || 10,
  };
  const posts = await PostRepos.findAll(options, req.query, { 
    isPaging: true,
    deleted: deleted == 'true' ? true : false,
  });
  const { docs, ...meta} = posts;
  new SuccessResponse('All Posts returned successfully', { docs, meta }).send(res);
});

export const updatePost = asyncHandler(async (req: ProtectedDataRequest, res: Response) => {
  
  if (req.body.images) req.post.images = req.body.images;
  if (req.body.action) req.post.action = req.body.action;
  if (req.body.category) req.post.category = req.body.category;
  if (req.body.address) req.post.address = req.body.address;
  if (req.body.propertyType) req.post.propertyType = req.body.propertyType;
  if (req.body.Name) req.post.Name = req.body.Name;
  if (req.body.description) req.post.description = req.body.description;
  if (req.body.Country) req.post.Country = req.body.Country;
  if (req.body.SalePrice) req.post.SalePrice = req.body.SalePrice;
  if (req.body.RentPrice) req.post.RentPrice = req.body.RentPrice;
  if (req.body.Space) req.post.Space = req.body.Space;
  if (req.body.availableDateforRent) req.post.availableDateforRent = req.body.availableDateforRent;
  if (req.body.selectedDates) req.post.selectedDates = req.body.selectedDates;
  if (req.body.Color) req.post.Color = req.body.Color;
  if (req.body.Condition) req.post.Condition = req.body.Condition;
  if (req.body.Transmission) req.post.Transmission = req.body.Transmission;
  if (req.body.displacementMoto) req.post.displacementMoto = req.body.displacementMoto;
  if (req.body.Mileage) req.post.Mileage = req.body.Mileage;
  if (req.body.Vehiculedisplacement) req.post.Vehiculedisplacement = req.body.Vehiculedisplacement;
  if (req.body.Marque) req.post.Marque = req.body.Marque;
  if (req.body.Model) req.post.Model = req.body.Model;
  if (req.body.below) req.post.below = req.body.below;
  if (req.body.above) req.post.above = req.body.above;
  if (req.body.FiscalPower) req.post.FiscalPower = req.body.FiscalPower;
  if (req.body.BodyType) req.post.BodyType = req.body.BodyType;
  if (req.body.Fuel) req.post.Fuel = req.body.Fuel;
  if (req.body.TruckType) req.post.TruckType = req.body.TruckType;  
  if (req.body.Year) req.post.Year = req.body.Year;
  if (req.body.OtherType) req.post.OtherType = req.body.OtherType;
  if (req.body.isApproved) req.post.isApproved = req.body.isApproved;
  const updatedPost = await PostRepos.update(req.post);

  return new SuccessResponse('this post is updated successfully', updatedPost).send(res);
});

export const deletePost = asyncHandler(async (req: ProtectedDataRequest, res: Response) => {
  const deletePost = await PostRepos.deletePost(req.post);
  console.log('postdeleted',deletePost)
  new SuccessResponse('this post is deleted successfully', deletePost).send(res);
});





export const getUserPosts = asyncHandler(async (req: ProtectedDataRequest, res: Response) => {
  const user = await UserRepo.findProfileById(req.user._id);
  if (!user) {
    throw new BadRequestError('User not registered');
  }
  const UserPosts = await PostRepos.findPostsByUserId(req.user._id);
  console.log('UserPosts', UserPosts);
  return new SuccessResponse('User posts fetched successfully', UserPosts).send(res);
});








