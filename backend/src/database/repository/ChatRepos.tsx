import Chat, { ChatModel } from '../model/Chat';
import { InternalError } from '../../core/ApiError';
import { Types } from 'mongoose';
import { BadRequestError } from '../../core/ApiError';
export default class ChatRepo {
    public static async findOne(query: object): Promise<Chat | null> {
      try {
        const chat = await ChatModel.findOne(query).lean<Chat>().exec();
        return chat;
      } catch (error) {
        throw new InternalError('Error finding chat');
      }
    }
    public static findById(id: Types.ObjectId): Promise<Chat | null> {
      return ChatModel.findById(id)
        //.select('+author')
        //.populate({ path: 'author' })
        .lean<Chat>()
        .exec();
    }
    public static update(chat: Chat): Promise<Chat | null> {
      return ChatModel.findByIdAndUpdate(chat._id, chat, { new: true })
      .lean()
      .exec();
    }
    public static async deleteChat(chat: Chat): Promise<any> {
      return ChatModel.findByIdAndUpdate(chat._id, {
        $set: { deletedAt: Date.now() },
      })
        //.populate({ path: 'author' })
        .exec();
    }
    public static async create(firstId: Types.ObjectId, secondId: Types.ObjectId, postId:Types.ObjectId): Promise<Chat> {
        try {
            console.log('Before chatExists check');
            // Vérifier si le chat existe déjà entre les deux membres
            const chatExists = await ChatModel.findOne({ members: { $all: [firstId, secondId] } });
            console.log('After chatExists check');
            if (chatExists) {
              throw new BadRequestError('Chat already exists');
            }
            console.log('Before chat creation');
            const now = new Date();
            const newChat = await ChatModel.create({ members: [firstId,secondId] , postId , createdAt: now});
            console.log('after chat creation');
            return newChat;
        } catch (error) {
            throw new InternalError('Chat already exists !!');
        }
    } 
    public static async find(query: object): Promise<Chat[]> {
      try {
        const chats = await ChatModel.find(query).lean<Chat[]>().exec();
        return chats;
      } catch (error) {
        throw new InternalError('Error finding chats');
      }
    }
}  
 