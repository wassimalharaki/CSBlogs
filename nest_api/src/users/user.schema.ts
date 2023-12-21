import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

/**
 * Represents a user in the system.
 */
@Schema({timestamps: true})
export class User {
  /**
   * The username of the user.
   */
  @Prop({required: true, unique: true})
  username: string;

  /**
   * The email address of the user.
   */
  @Prop({required: true, unique: true})
  email: string;

  /**
   * The password of the user.
   */
  @Prop({required: true})
  password: string;

  /**
   * The profile picture of the user.
   */
  @Prop({default: ""})
  profilePic: string;

  /**
   * The creation date of the user.
   */
  @Prop()
  createdAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);