import express from 'express';
import role from '../../../helpers/role';
import authentication from '../../../auth/authentication';
//import authorization from '../../../auth/authorization';
import { RoleCode } from '../../../database/model/Role';
import { deleteUser, getAllUsers,blockUser,unblockUser,getUser } from '../../../controllers/userController';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import {
  
    getUserPosts,
    
  } from '../../../controllers/postController';
const router = express.Router();

router.use('/', authentication/*, role(RoleCode.ADMIN), /*authorization*/);

  router.get(
    '/myPosts'
    ,getUserPosts
  );
router.get(
    '/getUser/:id'
    ,getUser
  );  
router.get('/all', getAllUsers);
router.delete('/:id', validator(schema.userId, ValidationSource.PARAM), deleteUser);
router.post('/blockUser/:id', validator(schema.userId, ValidationSource.PARAM), blockUser);
router.post('/unblockUser/:id', validator(schema.userId, ValidationSource.PARAM), unblockUser);
export default router;
