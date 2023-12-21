import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

/**
 * Represents a blog post.
 */
@Schema({timestamps: true})
export class Post {
  /**
   * The title of the post.
   */
  @Prop({required: true})
  title: string;

  /**
   * The description of the post.
   */
  @Prop({required: true})
  desc: string;

  /**
   * The username of the author of the post.
   */
  @Prop({required: true})
  username: string;
  
  /**
   * The photo associated with the post.
   */
  @Prop()
  photo: string;

  /**
   * The categories of the post.
   */
  @Prop()
  categories: string;

  /**
   * The creation date of the post.
   */
  @Prop()
  createdAt?: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);