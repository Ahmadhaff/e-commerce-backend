import mongoose, { Schema, model, Document } from 'mongoose';
import Post from './Post';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';

export const DOCUMENT_NAME = 'Reclamation';
export const COLLECTION_NAME = 'Reclamations';

export default interface Reclamation extends Document {
    senderId: Schema.Types.ObjectId,
    email:string,
    fullname:string,
    text: string,
    createdAt: Date;
    deletedAt: Date;
}

const schema = new Schema(
    {
        senderId:  { type: Schema.Types.ObjectId,
            ref: "User"
          },
        fullname: { type: Schema.Types.String},
        email: { type: Schema.Types.String},
        text: { type: Schema.Types.String},
        createdAt: {
          type: Schema.Types.Date,
          required: true,
        },
        deletedAt: {
          type: Date,
          select: true,
        },
    },
  
);
schema.plugin(mongoosePagination);
export const ReclamationModel = model<Reclamation, Pagination<Reclamation>>(DOCUMENT_NAME, schema, COLLECTION_NAME);
//export const UserModel = model<User, Pagination<User>>(DOCUMENT_NAME, schema, COLLECTION_NAME);