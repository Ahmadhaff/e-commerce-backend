import { ApiOptions } from 'app-request.d';
import { Types } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import { PagingObj } from 'pagination';
import APIFeatures from '../../helpers/apiFeatures';
import Post,{ PostModel } from '../model/Post';

//export default class PostRepos {
/*public static async create(postData: Post/*,file: Express.Multer.File, author: Types.ObjectId): Promise<Post> {
    const now = new Date();
    postData.createdAt = postData.updatedAt = now;
    //const images = file.path;
    const createdPost = await PostModel.create({ ...postData, author });
    return createdPost;
    return await createdPost.populate({ path: 'author' });
}*/
export default class PostRepos {
  public static async create(post: Post, author: Types.ObjectId): Promise<Post> {
      const now = new Date();
      post.createdAt = post.updatedAt = now;
      const createdPost = await PostModel.create({ ...post, author });
      return createdPost;
      return await createdPost.populate({ path: 'author' });
  }
  public static findFavoritesByUserId(userId: Types.ObjectId): Promise<Post[]> {
    return PostModel.find({ likes: userId }) // Assuming a field `favoritedBy` exists in PostModel
      .populate('author')
      .lean<Post[]>()
      .exec();
  }

  public static findPostsByUserId(userId: Types.ObjectId): Promise<Post[]> {
    return PostModel.find({ author: userId })
      .populate('author')
      .lean<Post[]>()
      .exec();
  }

  /*public static async findFavoritePosts(userId: string): Promise<Post[]> {
    const favoritePosts = await PostModel.find({ likes: userId }).lean<Post[]>().exec();
    return favoritePosts;
  }
  
  public static async findUserPosts(userId: string): Promise<Post[]> {
    const userPosts = await PostModel.find({ author: userId }).lean<Post[]>().exec();
    return userPosts;
  }*/
  /*public static async findLikedPosts(id: Types.ObjectId): Promise<Post[]> {
      const likedPosts = await PostModel.find({ likes: id }).lean<Post[]>().exec();
      return likedPosts;
  }*/
  
public static findByUrl(urls: string): Promise<Post | null> {
  //lean option tells Mongoose to skip instantiating a full Mongoose document
  // exec() function returns a promise
  return PostModel.findOne({ urls, deletedAt: null })
    .populate({ path: 'author'})
    .lean<Post>()
    .exec();
}
public static findById(id: Types.ObjectId): Promise<Post | null> {
  return PostModel.findById(id)
    .select('+author')
    .populate({ path: 'author' })
    .lean<Post>()
    .exec();
}

public static update(post: Post): Promise<Post | null> {
  post.updatedAt = new Date();

  return PostModel.findByIdAndUpdate(post._id, post, { new: true })
  .lean()
  .exec();
}
public static async findAll(
  paging: PagingObj,
  query: object,
  apiOptions: ApiOptions,
): Promise<PaginationModel<Post>> {
  const { deleted } = apiOptions;
  const findAllQuery = PostModel.find(
    deleted ? { deleted: { $ne: null } } : { deletedAt: null },
  );

  const features = new APIFeatures(findAllQuery, query)
    .filter()
    .sort()
    .limitFields()
    .search(['category','action']);
  const options = {
    query: features.query,
    limit: paging.limit ? paging.limit : null,
    page: paging.page ? paging.page : null,
  };
  return (await PostModel.paginate(options)) as PaginationModel<Post>;
}
public static async deletePost(post: Post): Promise<any> {
  return PostModel.findByIdAndUpdate(post._id, {
    $set: { deletedAt: Date.now() },
  })
    .populate({ path: 'author' })
    .exec();
}
}
