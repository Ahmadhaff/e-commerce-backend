import authentication from '../../../auth/authentication';
import express from 'express';
import { checkChat } from '../../../middlewares/chat';
//import validator, { ValidationSource } from '../../../helpers/validator';
//import schema from './schema';
import {
    createChat,
    findUserChats,
    findChat,
    deleteChat
} from '../../../controllers/chatController';


const router = express.Router();

router.use('/', authentication);

router.post('/', createChat); 
router.get('/userChat', findUserChats);
router.get('/find/:firstId/:secondId', findChat);
router.delete('/:id', /*validator(schema.postID, ValidationSource.PARAM),*/checkChat, deleteChat);
export default router;
