import express from 'express';
import access from './access/access';
import profile from './user/profile';
import users from './user/user';
import posts from './post/post';
import chat from './chat/chat';
import message from './message/message';
import favorite from './favorite/favorite';
import reclamation from './reclamation/reclamation';
import notification from './notification/notification';
import googleAccess from  './access/googleAccess';
import facebookAccess from  './access/facebookAccess';

const router = express.Router();

router.use('/posts', posts);
router.use('/', access);
router.use('/', googleAccess );
router.use('/', facebookAccess );
router.use('/profile', profile);
router.use('/users', users);
router.use('/chat', chat);
router.use('/message', message);
router.use('/favorite', favorite);
router.use('/reclamation', reclamation);
router.use('/notifications', notification);

export default router;
