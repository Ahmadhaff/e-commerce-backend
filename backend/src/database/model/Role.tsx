import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Role';
export const COLLECTION_NAME = 'roles';

export const enum RoleCode {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export default interface Role extends Document {
  code: RoleCode;
}

const schema = new Schema(
  {
    code: {
      type: String,
      //enum: Object.values(RoleCode),
      //type: Schema.Types.String,
      required: true,
      //enum: [RoleCode.ADMIN, RoleCode.USER],
    },
    /*
    createdAt: {
      type: Date,
      required: true,
      select: false,
    },
    updatedAt: {
      type: Date,
      required: true,
      select: false,
    },*/
  },
  
);

export const RoleModel = model<Role>(DOCUMENT_NAME, schema, COLLECTION_NAME);