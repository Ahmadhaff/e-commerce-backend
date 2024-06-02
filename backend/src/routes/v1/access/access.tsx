import express from 'express';
import { Request, Response, Router } from 'express';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
//import passport from '../../config/authConfig';
//import  passport  from '../../../middlewares/google0Auth';
import { login, logout, refreshToken, signup,resetPassword } from '../../../controllers/authController';
import authentication from '../../../auth/authentication';
const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.post('/resetPassword', resetPassword);

router.use('/', authentication);
router.post('/refresh', refreshToken );
router.delete('/logout', logout);


export default router;



