import Message, { MessageModel } from '../model/Message';
import { InternalError } from '../../core/ApiError';
import { Types } from 'mongoose';
import { BadRequestError } from '../../core/ApiError';
export default class MessageRepo {
    public static async create(chatId: Types.ObjectId, senderId:Types.ObjectId, text: String): Promise<Message> {
            const now = new Date();
            const message = await MessageModel.create({ chatId, senderId, text, createdAt: now});
            console.log('after chat creation');
            return message;
        
    } 
    public static findById(id: Types.ObjectId): Promise<Message | null> {
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
    }
}  
 