import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { CreatePostDto, UpdatePostDto } from './post-dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  /**
   * Retrieves all posts.
   * @returns A promise that resolves to an array of PostDocument objects.
   */
  async findAll(): Promise<PostDocument[]> {
    return await this.postModel.find().exec();
  }

  /**
   * Creates a new post.
   * @param cpd - The data for creating the post.
   * @returns A promise that resolves to the created PostDocument object.
   */
  async createPost(cpd: CreatePostDto): Promise<PostDocument> {
    return await this.postModel.create(cpd);
  }

  /**
   * Updates a post by its ID.
   * @param id - The ID of the post to update.
   * @param upd - The data for updating the post.
   * @returns A promise that resolves to the updated PostDocument object.
   */
  async updatePostById(id: string, upd: UpdatePostDto): Promise<PostDocument> {
    return await this.postModel.findByIdAndUpdate(id, upd).exec();
  }

  /**
   * Deletes a post by its ID.
   * @param id - The ID of the post to delete.
   * @returns A promise that resolves when the post is deleted.
   */
  async deletePostById(id: string): Promise<void> {
    await this.postModel.findByIdAndDelete(id).exec();
  }

  /**
   * Finds a post by its ID.
   * @param id - The ID of the post to find.
   * @returns A promise that resolves to the found PostDocument object.
   */
  async findPostById(id: string): Promise<PostDocument> {
    return await this.postModel.findById(id).exec();
  }
}