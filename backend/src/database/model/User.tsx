import { model, Schema, Document } from 'mongoose';
import Role from './Role';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import bcrypt from 'bcryptjs';
import { checkServerIdentity } from 'tls';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export enum CityEnum {
  Tunisia = 'Tunisia',
  Monastir = 'Monastir',
  Mahdia = 'Mahdia',
}

interface Address {
  Country: string;
  City: CityEnum;
  Street: string;
}

export default interface User extends Document {
  firstname: string;
  lastname: string;
  email?: string;
  password: string;
  profilePicUrl?: string;
  /*role?: {
    _id: Schema.Types.ObjectId;
    code: string;
  };*/
  role?:Schema.Types.ObjectId;
  facebookId?: string;
  googleId?: string;
  isBlocked?: boolean;
  address?:object,
  createdAt: Date;
  updatedAt?: Date;
}

/*const addressSchema = new Schema({
  Country: Schema.Types.String,
  City: { type: Schema.Types.String, enum: Object.values(CityEnum) },
  Street: Schema.Types.String,
});*/

const schema = new Schema(
  {
    firstname: Schema.Types.String,
    lastname: Schema.Types.String,
    email: {
      type: Schema.Types.String,
      unique: true,
      trim: true,
    },
    password: {
      type: Schema.Types.String,
      select: false,
    },
    profilePicUrl: {
     type: Schema.Types.String,
      trim: true,
    },
    /*address:[{
      Country: Schema.Types.String
      City:{ type: Schema.Types.String, enum: Object.values(CityEnum)},
      Street: Schema.Types.String
    }],*/
    /*address: {Country: Schema.Types.String,
      City: { type: Schema.Types.String, enum: Object.values(CityEnum) },
      Street: Schema.Types.String,
    },*/
    address: {
      Country: { type: Schema.Types.String },
      City: { type: Schema.Types.String, enum: Object.values(CityEnum) },
      Street: { type: Schema.Types.String },
    },
    
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
    facebookId: {
      type: Schema.Types.String,
      unique: true,
      sparse: true,
    },
    googleId: { 
      type: String, 
      unique: true,
      sparse: true
   },
    isBlocked: {
      type: Schema.Types.Boolean, 
      default: false, 
    },
    /*createdAt: {
      type: Date,
      //required: true,
      select: false,
    },
    updatedAt: {
      type: Date,
      //required: true,
      select: false,
    },*/

    deletedAt: {
      type: Date,
      select: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }

);

schema.plugin(mongoosePagination);
schema.pre('save', async function (this: User, next) {
  if (this.isModified('email')) this.email = this.email?.toLocaleLowerCase();

  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

schema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export const UserModel = model<User, Pagination<User>>(DOCUMENT_NAME, schema, COLLECTION_NAME);