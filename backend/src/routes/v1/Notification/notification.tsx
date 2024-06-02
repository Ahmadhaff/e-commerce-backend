import authentication from '../../../auth/authentication';
import express from 'express';
//import validator, { ValidationSource } from '../../../helpers/validator';
//import schema from './schema';
import {
    createNotification,
    findUserNotification,
    updateNotification,
    
} from '../../../controllers/notificationController';
//import { checkPost } from '../../../middlewares/post';

const router = express.Router();

router.use('/', authentication);

router.post('/createNotification', createNotification); 
router.get('/userNotification', findUserNotification);
router.patch('/:id', updateNotification);
//router.get('/find/:firstId/:secondId', findChat);

export default router;
