import Reclamation, { ReclamationModel } from '../model/Reclamation';
import { InternalError } from '../../core/ApiError';
import User, { UserModel } from '../model/User';
import { Types } from 'mongoose';
import { ApiOptions } from 'app-request.d';
import { PaginationModel } from 'mongoose-paginate-ts';
import APIFeatures from '../../helpers/apiFeatures';
import { PagingObj } from 'pagination';
import { BadRequestError } from '../../core/ApiError';
export default class ReclamationRepo {
    public static async create( senderId:Types.ObjectId, email: string,fullname: string, text: string): Promise<Reclamation> {
            const now = new Date();
            const message = await ReclamationModel.create({ senderId, email, fullname, text, createdAt: now});
            console.log('after chat creation');
            return message;
        
    } 
    public static async findAll(
      paging: PagingObj,
      query: object,
      apiOptions: ApiOptions,
    ): Promise<PaginationModel<Reclamation>> {
      const { deleted } = apiOptions;
      const findAllQuery = ReclamationModel.find(
        deleted ? { deleted: { $ne: null } } : { deletedAt: null },
      );
    
      const features = new APIFeatures(findAllQuery, query)
        .filter()
        .sort()
        .limitFields()
        .search(['senderId','email']);
      const options = {
        query: features.query,
        limit: paging.limit ? paging.limit : null,
        page: paging.page ? paging.page : null,
      };
      return (await ReclamationModel.paginate(options)) as PaginationModel<Reclamation>;
    }
   /* public static findById(id: Types.ObjectId): Promise<Message | null> {
      return MessageModel.findById(id)
        //.select('+author')
        //.populate({ path: 'author' })
        .lean<Message>()
        .exec();
    }
    public static update(message: Message): Promise<Message | null> {
      return MessageModel.findByIdAndUpdate(message._id, message, { new: true })
      .lean()
      .exec();
    }
    public static async deleteMessage(message: Message): Promise<any> {
      return MessageModel.findByIdAndUpdate(message._id, {
        $set: { deletedAt: Date.now() },
      })
        .exec();
    }
    public static async find(query: object): Promise<Message[]> {
      try {
        const messages = await MessageModel.find(query).lean<Message[]>().exec();
        return messages;
      } catch (error) {
        throw new InternalError('Error finding messages');
      }
    }*/
}  
 