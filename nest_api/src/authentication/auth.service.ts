import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/user.schema';
import { CreateUserDto } from './create-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Registers a new user.
   * @param cud - The CreateUserDto object containing user registration data.
   * @returns A Promise that resolves to the created UserDocument.
   */
  async register(cud: CreateUserDto): Promise<UserDocument> {
    const salt = await bcrypt.genSalt(10);
    cud.password = await bcrypt.hash(cud.password, salt);
    return await this.userModel.create(cud);
  }

  /**
   * Logs in a user.
   * @param username - The username of the user.
   * @param pwd - The password of the user.
   * @returns A Promise that resolves to the UserDocument of the logged-in user.
   * @throws NotFoundException if the provided credentials are incorrect.
   */
  async login(username: string, pwd: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({username}).exec();

    if (!user)
      throw new NotFoundException('Wrong credentials!');

    const match = await bcrypt.compare(pwd, user.password);
    if (!match)
      throw new NotFoundException('Wrong credentials!');

    return user;
  }

  /**
   * Finds a user by email.
   * @param email - The email of the user to find.
   * @returns A Promise that resolves to the UserDocument with the specified email.
   */
  async findById(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({where: {email: email}}).exec();
  }
}
