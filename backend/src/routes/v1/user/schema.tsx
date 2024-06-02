import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helpers/validator';
import { CityEnum } from '../../../database/model/User';;

export default {
  userId: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
  profile: Joi.object().keys({
    firstname: Joi.string().optional().min(1).max(200),
    lastname: Joi.string().optional().min(1).max(200),
    email: Joi.string().optional(),
    profilePicUrl: Joi.string().optional().uri(),
    password: Joi.string().optional().min(6),
    //address: Joi.array().optional(),
    address: Joi.object().keys({
      Country: Joi.string().required(), // Rendre le pays obligatoire
      City: Joi.string().valid(...Object.values(CityEnum)).required(), // Rendre la ville obligatoire
      Street: Joi.string().required(), // Rendre la rue obligatoire
    }).optional(),
  }),
};