import { IsNotEmpty } from 'class-validator';

/**
 * Data transfer object for updating a user.
 */
export class UpdateUserDto {
  /**
   * The ID of the user.
   */
  @IsNotEmpty()
  id: string;

  /**
   * The new password for the user.
   */
  password: string;

  /**
   * The URL of the new profile picture for the user.
   */
  profilePic: string;

  constructor(
    id: string,
    password: string,
    profilePic: string,
  ) {
    this.id = id;
    this.password = password;
    this.profilePic = profilePic;
  }
}