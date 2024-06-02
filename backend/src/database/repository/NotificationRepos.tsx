import Notification, { NotificationModel } from '../model/Notification';
import { InternalError } from '../../core/ApiError';
import { Types } from 'mongoose';
import { BadRequestError } from '../../core/ApiError';
export default class NotificationRepo {

    
    public static async create(sourceId: Types.ObjectId, targetId: Types.ObjectId, postId: Types.ObjectId, message: string, type: string): Promise<Notification> {
      try {
          const now = new Date();
          const newNotification = await NotificationModel.create({
              //members: [sourceId, targetId],
              sourceId,
              targetId,
              message,
              type,
              postId,
              createdAt: now,
              updatedAt: now,
          });
          return newNotification;
      } catch (error) {
          console.error('Error creating notification:', error);
          throw new InternalError('Server error while creating notification');
      }
    }
    /*public static async find(query: object, type?: string): Promise<Notification[]> {
      try {
        let finalQuery = { ...query };
        if (type) {
          finalQuery = { ...finalQuery, type: type };
        }
        const notifications = await NotificationModel.find(finalQuery).lean<Notification[]>().exec();
        return notifications;
      } catch (error) {
        console.error('Error finding notifications:', error); // Log de l'erreur
        throw new InternalError('Error finding notifications');
      }
    }*/
    ////newwww
    /*public static async find(query: object, type?: string): Promise<Notification[]> {
      try {
        let finalQuery = { ...query };
        if (type) {
          finalQuery = { ...finalQuery, type: type };
        }
        const notifications = await NotificationModel.find(finalQuery).lean<Notification[]>().exec();
        return notifications;
      } catch (error) {
        console.error('Error finding notifications:', error); // Log de l'erreur
        throw new InternalError('Error finding notifications');
      }
    }*/
    /*public static async find(query: object, types?: string[]): Promise<Notification[]> {
      try {
        let finalQuery = { ...query };
        if (types && types.length > 0) {
          finalQuery = { ...finalQuery, type: { $in: types } };
        }
        const notifications = await NotificationModel.find(finalQuery).lean<Notification[]>().exec();
        return notifications;
      } catch (error) {
        console.error('Error finding notifications:', error); // Log de l'erreur
        throw new InternalError('Error finding notifications');
      }
    }*/
    public static async find(query: object, types?: string[]): Promise<Notification[]> {
      try {
        let finalQuery = { ...query };
        if (types && types.length > 0) {
          finalQuery = { ...finalQuery, type: { $in: types } };
        }
        const notifications = await NotificationModel.find(finalQuery).lean<Notification[]>().exec();
        return notifications;
      } catch (error) {
        console.error('Error finding notifications:', error); // Log de l'erreur
        throw new InternalError('Error finding notifications');
      }
    }
    
    /*public static async find(query: object): Promise<Notification[]> {
      try {
        const notifications = await NotificationModel.find(query).lean<Notification[]>().exec();
        return notifications;
      } catch (error) {
        throw new InternalError('Error finding notifications');
      }
    }*/
    public static update(notification: Notification): Promise<Notification | null> {
      notification.updatedAt = new Date();
    
      return NotificationModel.findByIdAndUpdate(notification._id, notification, { new: true })
      .lean()
      .exec();
    }
    
    public static async findByObj(obj: object): Promise<Notification | null> {
      try {
          const notification = await NotificationModel.findOne(obj).lean<Notification>().exec();
          return notification;
      } catch (error) {
          console.error('Error finding notification:', error);
          throw new InternalError('Error finding notification');
      }
    }

    public static async updateInfo(notification: Notification): Promise<Notification | null> {
      try {
          notification.updatedAt = new Date();
          const updatedNotification = await NotificationModel.findOneAndUpdate(
              { _id: notification._id },
              { $set: { isRead: notification.isRead, updatedAt: notification.updatedAt } },
              { new: true }
          ).lean().exec();

          return updatedNotification;
      } catch (error) {
          console.error('Error updating notification:', error);
          throw new InternalError('Error updating notification');
      }
    }
}
  
 