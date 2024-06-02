/*import mongoose, { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Favorite';
export const COLLECTION_NAME = 'Favorites';

export default interface Favorite extends Document {
    postId: Schema.Types.ObjectId[],
    userId: Schema.Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

const schema = new Schema(
    {
        postId: [{ type: Schema.Types.ObjectId,
            ref: "Post"
         }],
        userId:  { type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
          },
          createdAt: {
            type: Schema.Types.Date,
            required: true,
            select: false,
          },
          updatedAt: {
            type: Date,
            select: true,
          },
        deletedAt: {
          type: Date,
          select: true,
        },
    },
  
);
export const FavoriteModel = model<Favorite>(DOCUMENT_NAME, schema, COLLECTION_NAME);*/
import { Document, Schema, model } from 'mongoose';
export const DOCUMENT_NAME = 'Favorite';
export const COLLECTION_NAME = 'Favorites';

export default interface Favorite extends Document {
  postId: Schema.Types.ObjectId[];
  userId: Schema.Types.ObjectId;
  createdAt?: Date;  // Rend createdAt facultatif
  updatedAt: Date;
  deletedAt: Date;
}

const schema = new Schema(
  {
    postId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      select: false,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      select: true,
    },
    deletedAt: {
      type: Date,
      select: true,
    },
  },
  { timestamps: true }
);

export const FavoriteModel = model<Favorite>(DOCUMENT_NAME, schema, COLLECTION_NAME);
