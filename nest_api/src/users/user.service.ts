import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { UpdateUserDto } from './update-user-dto';
import * as bcrypt from 'bcrypt';

/**
 * Service class for managing users.
 */
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Retrieves all users.
   * @returns A promise that resolves to an array of UserDocument objects.
   */
  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }

  /**
   * Updates a user.
   * @param updateUserDto - The DTO (Data Transfer Object) containing the updated user information.
   * @returns A promise that resolves to the updated UserDocument object.
   * @throws NotFoundException if the user with the specified ID is not found.
   */
  async updateUser(updateUserDto: UpdateUserDto): Promise<UserDocument> {
    var user = await this.findById(updateUserDto.id);

    if (!user)
        throw new NotFoundException('User not found');
    
    if (updateUserDto.password.length > 0) {
        const salt = await bcrypt.genSalt(10);
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
        user.password = updateUserDto.password;
    }
    if (updateUserDto.profilePic.length > 0)
        user.profilePic = updateUserDto.profilePic;

    await this.userModel.findByIdAndUpdate(user._id, {
        password: user.password,
        profilePic: user.profilePic
    }).exec();
    
    return user;
  }

  /**
   * Deletes a user by ID.
   * @param id - The ID of the user to delete.
   * @returns A promise that resolves when the user is successfully deleted.
   */
  async deleteUser(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  /**
   * Finds a user by ID.
   * @param id - The ID of the user to find.
   * @returns A promise that resolves to the UserDocument object with the specified ID.
   */
  async findById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id).exec();
  }
}
