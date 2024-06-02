import { Request } from 'express';
import User from '../database/model/User';
import Keystore from '../database/model/KeyStore';
import Post  from '../database/model/Post';
import Notification from '../database/model/Notification';
import Chat from '../database/model/Chat';
import Message from '../database/model/Message';


declare interface DataRequest extends Request {
  post: Post;
  chat: Chat;
  message: Message;
}
declare interface PublicRequest extends Request {
  apiKey: string;
  headers: {
    authorization: string;
  };
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCode: string;
}

declare interface ProtectedRequest extends RoleRequest {
  user: User;
  accessToken: string;
  keystore: Keystore;
  file?: Express.Multer.File;
}
declare interface ProtectedDataRequest extends ProtectedRequest {
  post: Post;
  notification: Notification;
  chat: Chat;
  message: Message;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
declare interface ApiOptions {
  deleted?: boolean;
  isPaging?: boolean;
  
}
export {
  DataRequest,
  PublicRequest,
  RoleRequest,
  ProtectedRequest,
  ProtectedDataRequest,
  Tokens,
  ApiOptions,
};


