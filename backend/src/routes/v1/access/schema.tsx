import Joi from '@hapi/joi';
import { JoiAuthBearer } from '../../../helpers/validator';

export default {
  userCredential: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
  refreshToken: Joi.object().keys({
    refreshToken: Joi.string().required().min(1),
  }),
  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
  signup: Joi.object().keys({
    firstname: Joi.string().required().min(1),
    lastname: Joi.string().required().min(1),
    
    email: Joi.string().required().email(),
    password: Joi.string().required().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,30}$/),
    profilePicUrl: Joi.string().optional().uri(),
  }),
};
//^[a-zA-Z0-9]{8,30}$/