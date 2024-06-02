import mongoose, { Schema, model, Document } from 'mongoose';
import User from './User';
import Post from './Post';

export const DOCUMENT_NAME = 'Chat';
export const COLLECTION_NAME = 'Chats';

export default interface Chat extends Document {
    members: Schema.Types.ObjectId[];
    postId: Schema.Types.ObjectId,
    createdAt: Date;
    deletedAt: Date;   
}

const schema = new Schema(
    {
        members:  
          [{ type: Schema.Types.ObjectId,
            ref: "User"
          }],
        postId: { type: Schema.Types.ObjectId,
          ref: "Post"
        },
        createdAt: {
          type: Schema.Types.Date,
          required: true,
          select: false,
        },
        deletedAt: {
          type: Date,
          select: true,
        },
    },
  
);
export const ChatModel = model<Chat>(DOCUMENT_NAME, schema, COLLECTION_NAME);