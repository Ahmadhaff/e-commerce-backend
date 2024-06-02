import express from 'express';
import validator from '../../../helpers/validator';
import schema from './schema';
import role from '../../../helpers/role';
import _ from 'lodash';
import authentication from '../../../auth/authentication';
//import authorization from '../../../auth/authorization';
import {uploadMiddleware} from '../../../middlewares/multer';
import { getMyProfile, updateProfile,saveProfilePicture,changePassword,deleteProfile } from '../../../controllers/profileController';
import { RoleCode } from '../../../database/model/Role';
import  { ValidationSource } from '../../../helpers/validator';
const router = express.Router();

router.use('/', authentication);
router.post('/uploadPicture', uploadMiddleware, saveProfilePicture)
//router.use('/', role(RoleCode.USER), authorization);
router.get(
  '/myProfile',
   getMyProfile
);

router.put(
  '/updateProfile',
  validator(schema.profile),
  updateProfile
);
router.use('/', authentication);
router.put(
  '/changepassword',
  /*validator(schema.profile)*/
  changePassword
);

router.delete(
  '/deletedAccount',
  deleteProfile
);

//router.use('/', role(RoleCode.USER), authorization);

export default router;