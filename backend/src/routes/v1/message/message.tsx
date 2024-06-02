import authentication from '../../../auth/authentication';
import express from 'express';
import { checkMessage } from '../../../middlewares/Message';
//import validator, { ValidationSource } from '../../../helpers/validator';
//import schema from './schema';
import {
    createMessage,
    getMessages,
    deleteMessage
} from '../../../controllers/messageController';

const router = express.Router();

router.use('/', authentication);
router.post("/createMessage", createMessage); 
router.get("/:chatId", getMessages);
router.delete('/:id', /*validator(schema.postID, ValidationSource.PARAM),*/checkMessage, deleteMessage);
export default router;
