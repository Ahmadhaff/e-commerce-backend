import Keystore, { KeystoreModel } from '../model/KeyStore';
import { Types } from 'mongoose';
import User from '../model/User';

export default class KeystoreRepo {
  public static findforKey(client: User, key: string): Promise<Keystore | null> {
    return KeystoreModel.findOne({ client: client, status: true }).exec();
  }

  public static remove(id: Types.ObjectId): Promise<Keystore | null> {
    return KeystoreModel.findByIdAndRemove(id).lean<Keystore>().exec();
  }

  public static find(
    client: User,
    //accessToken: string,
    refreshToken: string,
  ): Promise<Keystore | null> {
    return KeystoreModel.findOne({
      client: client,
      //accessToken:accessToken,
      refreshToken: refreshToken,
    })
      .lean<Keystore>()
      .exec();
  }

  public static async create(
    client: User,
    accessToken: string,
    refreshToken: string,
  ): Promise<Keystore> {
    const now = new Date();
    const keystore = await KeystoreModel.create({
      client: client,
      accessToken: accessToken,
      refreshToken: refreshToken,
      createdAt: now,
      updatedAt: now,
    } as Keystore);
    return keystore.toObject();
  }
  
  public static async update(
    id: Types.ObjectId,
    updates: Partial<Keystore>,
  ): Promise<Keystore | null> {
    const keystore = await KeystoreModel.findByIdAndUpdate(id, updates, { new: true }).exec();
    return keystore ? keystore.toObject() : null;
  } 

  
  
   
}