import { IsNotEmpty } from 'class-validator';

/**
 * Data transfer object for creating a post.
 */
export class CreatePostDto {
  /**
   * The title of the post.
   */
  @IsNotEmpty()
  title: string;
  
  /**
   * The description of the post.
   */
  @IsNotEmpty()
  desc: string;
  
  /**
   * The username of the author of the post.
   */
  @IsNotEmpty()
  username: string;

  /**
   * The photo associated with the post.
   */
  photo: string;

  constructor(
    title: string,
    desc: string,
    username: string,
    photo: string,
  ) {
    this.title = title;
    this.desc = desc;
    this.username = username;
    this.photo = photo;
  }
}

/**
 * Data transfer object for updating a post.
 */
export class UpdatePostDto {
  /**
   * The title of the post.
   */
  @IsNotEmpty()
  title: string;
  
  /**
   * The description of the post.
   */
  @IsNotEmpty()
  desc: string;

  constructor(
    title: string,
    desc: string,
  ) {
    this.title = title;
    this.desc = desc;
  }
}