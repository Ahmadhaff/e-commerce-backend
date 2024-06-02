import authentication from '../../../auth/authentication';
import express from 'express';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import {
  
  likePost,
  //unlikePost,
  fetchFavoritePosts,
} from '../../../controllers/favoriteController';
import { checkPost } from '../../../middlewares/post';
const router = express.Router();
router.use('/', authentication);
router.get(
    '/myfavoris'
    ,fetchFavoritePosts
  );
router.post('/like/:id',validator(schema.postID, ValidationSource.PARAM),checkPost,likePost);
//router.delete('/unlike/:id',validator(schema.postID, ValidationSource.PARAM),checkPost,unlikePost); 
export default router;