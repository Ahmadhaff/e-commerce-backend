import mongoose, { Schema, model, Document } from 'mongoose';
import Post from './Post';

export const DOCUMENT_NAME = 'Message';
export const COLLECTION_NAME = 'Messages';

export default interface Message extends Document {
    chatId: Schema.Types.ObjectId,
    senderId: Schema.Types.ObjectId,
    text: String,
    createdAt: Date;
    deletedAt: Date;
}

const schema = new Schema(
    {
        chatId: { type: Schema.Types.ObjectId,
            ref: "Post"
          },
        senderId:  { type: Schema.Types.ObjectId,
            ref: "User"
          },
        text: { type: Schema.Types.String},
        createdAt: {
          type: Schema.Types.Date,
          required: true,
          //select: false,
        },
        deletedAt: {
          type: Date,
          select: true,
        },
    },
  
);
export const MessageModel = model<Message>(DOCUMENT_NAME, schema, COLLECTION_NAME);