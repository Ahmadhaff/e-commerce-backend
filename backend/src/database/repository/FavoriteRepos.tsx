import { Types } from 'mongoose';
import Favorite, { FavoriteModel } from '../model/Favorite';
import { InternalError } from '../../core/ApiError';

export default class FavoriteRepo {

  public static async create(userId: Types.ObjectId, posteId: Types.ObjectId): Promise<Favorite> {
    try {
      const now = new Date();
      const newFavorite = await FavoriteModel.create({ userId, postId: [posteId], createdAt: now });
      return newFavorite;
    } catch (error) {
      throw new InternalError('Server error');
    }
  }
  public static async findOne( postId: Types.ObjectId): Promise<Favorite | null> {
    try {
      return FavoriteModel.findOne({ postId })
        .populate('postId')
        .lean<Favorite>()
        .exec();
    } catch (error) {
      throw new InternalError('Error finding favorite');
    }
  }

  

  public static async findByObj(query: object): Promise<Favorite | null> {
    try {
      return FavoriteModel.findOne(query)
        .populate('postId')
        //.lean<Favorite>()
        .exec();
    } catch (error) {
      throw new InternalError('Error finding favorite');
    }
  }
  
  public static async findOneAndUpdate(
    filter: any,
    update: any,
    options: any
  ): Promise<Favorite | null> {
    try {
      return await FavoriteModel.findOneAndUpdate(filter, update, options)
        .lean<Favorite>()
        .exec();
    } catch (error) {
      throw new InternalError('Error updating favorite');
    }
  }

  public static async updateInfo(favorite: Favorite): Promise<Favorite | null> {
    try {
      // Créez un nouvel objet avec les champs que vous souhaitez mettre à jour
      const updateData = {
        ...favorite,
        updatedAt: new Date(),
      };

      // Evitez de mettre à jour les champs immuables comme createdAt
      delete updateData.createdAt;

      // Mettez à jour le document et retournez la nouvelle version
      const updatedFavorite = await FavoriteModel.findByIdAndUpdate(
        favorite._id,
        { $set: updateData },
        { new: true }
      )
        .lean<Favorite>()
        .exec();

      return updatedFavorite;
    } catch (error) {
      throw new InternalError('Error updating favorite');
    }
  }
  static async remove(userId: Types.ObjectId, postId: Types.ObjectId) {
    const favorite = await FavoriteModel.findOneAndUpdate(
        { userId },
        { $pull: { postId } },
        { new: true }
    );
    return favorite;
}
}
