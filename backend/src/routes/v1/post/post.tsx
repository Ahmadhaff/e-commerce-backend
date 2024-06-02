import authentication from '../../../auth/authentication';
import express from 'express';
import {uploadMiddleware} from '../../../middlewares/multer';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
  //likePost,
  //unlikePost,
} from '../../../controllers/postController';
import { checkPost } from '../../../middlewares/post';
import { sendVerificationCode } from '../../../nodemailer/sendVerificationCode';
import { verifyCode } from '../../../nodemailer/VerifyCode';

const router = express.Router();
router.get('/all', getAllPosts);

router.post('/sendVerifCode', sendVerificationCode);
router.post('/verifyCode', verifyCode);

router.get('/:id', validator(schema.postID, ValidationSource.PARAM), checkPost, getPost);

router.use('/', authentication);

router.post('/',uploadMiddleware, validator(schema.createPost), createPost);
router.patch(
  '/:id',
  validator(schema.postID, ValidationSource.PARAM),
  validator(schema.updatePost),
  checkPost,
  uploadMiddleware,
  updatePost,
);
router.delete('/:id', validator(schema.postID, ValidationSource.PARAM),checkPost, deletePost);


export default router;
