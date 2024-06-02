import mongoose, { Schema, model, Document } from 'mongoose';
import User from './User';
import Post from './Post';


export const DOCUMENT_NAME = 'Notification';
export const COLLECTION_NAME = 'Notifications';

export default interface Notification extends Document {
    type: String;
    targetId: Schema.Types.ObjectId ;
    sourceId: Schema.Types.ObjectId;
    isRead: boolean;
    message:String;
    postId?:Schema.Types.ObjectId
    createdAt: Date;
    updatedAt?: Date;  
}

const schema = new Schema(
    {
        type: {
            type: String,
            enum: ["NEW_POST_TO_CONTROL", "YOUR_POST_STATE", "LIKED", "NEW_MESSAGE"],
        },
        targetId: { type: Schema.Types.ObjectId, ref: "User" },
        sourceId: { type: Schema.Types.ObjectId, ref: "User" },
        message: { type: Schema.Types.String},  
        isRead: {
            type: Schema.Types.Boolean, 
            default: false, 
        },
        postId:  
          { type: Schema.Types.ObjectId,
            ref: "Post"
          },
        /*createdAt: {
          type: Schema.Types.Date,
          required: true,
          select: false,
        },
        updatedAt: {
            type: Schema.Types.Date,
            required: true,
            select: false,
        },*/
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
    
  
);
export const NotificationModel = model<Notification>(DOCUMENT_NAME, schema, COLLECTION_NAME);