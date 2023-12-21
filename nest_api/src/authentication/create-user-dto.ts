import { IsNotEmpty } from 'class-validator';

/**
 * Data transfer object for creating a user.
 */
export class CreateUserDto {

    /**
     * The email of the user.
     */
    @IsNotEmpty()
    email: string;

    /**
     * The username of the user.
     */
    @IsNotEmpty()
    username: string;

    /**
     * The password of the user.
     */
    @IsNotEmpty()
    password: string;
  
    constructor(
      email: string,
      username: string,
      password: string,
    ) {
      this.email = email;
      this.username = username;
      this.password = password;
    }
}