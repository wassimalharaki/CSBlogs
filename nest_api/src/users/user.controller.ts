import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
} from '@nestjs/common';
import { UsersService } from './user.service';

/**
 * Controller for handling user-related operations.
 */
@Controller('api/users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    /**
     * Get a user by their ID.
     * @param id - The ID of the user.
     * @returns The user object.
     */
    @Get('/:id')
    async getUserById(@Param('id') id: string) {
        const user = await this.userService.findById(id);
        return { user };
    }

    /**
     * Update a user by their ID.
     * @param id - The ID of the user.
     * @param password - The new password for the user.
     * @param profilePic - The new profile picture for the user.
     * @returns The updated user object.
     */
    @Put('/')
    async updateUserById(
            @Body('userId') id: string,
            @Body('password') password: string,
            @Body('profilePic') profilePic: string,
        ) {
        if (!profilePic)
            profilePic = '';
        if (!password)
            password = '';
        const user = await this.userService.updateUser({
            id: id,
            password: password,
            profilePic: profilePic
        });
        return { user };
    }

    /**
     * Delete a user by their ID.
     * @param id - The ID of the user.
     * @returns A message indicating that the user has been deleted.
     */
    @Delete('/')
    async deleteUserBydId(@Body('userId') id: string) {
        this.userService.deleteUser(id);
        return "User has been deleted...";
    }
}