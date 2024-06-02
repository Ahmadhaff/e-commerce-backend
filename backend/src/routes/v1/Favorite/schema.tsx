import Joi from '@hapi/joi';
import { JoiObjectId, JoiUrlEndpoint } from '../../../helpers/validator';

export default {
  
  postID: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
  /*userId: Joi.object().keys({
    id: JoiObjectId().required(),
  }),*/
};
