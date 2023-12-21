import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

/**
 * Controller for handling user-related operations.
 */
@ApiTags('users')
@Controller('api/users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    /**
     * Get a user by their ID.
     * @param id - The ID of the user.
     * @returns The user object.
     */
    @Get('/:id')
    @ApiOperation({summary: 'Receives id from params => returns user if exists'})
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
    @ApiOperation({summary: 'Receives id, password, profilePic from body => updates user if exists'})
    @ApiBody({
        type: 'object',
        required: true,
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'string', description: 'User\'s id', example: "655f1b57f5e4ed0a345a8f0c"},
                password: { type: 'string', format: 'password', description: 'User\'s password', example: "wassim" },
                profilePic: { type: 'string', description: 'User\'s profile picture', example: "1701013980564pfp.jpeg" },
            },
            required: ['userId']
        }
    })
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
    @ApiOperation({summary: 'Receives id from body => deletes user if exists'})
    @ApiBody({
        type: 'object',
        required: true,
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'string', description: 'User\'s id', example: "655f1b57f5e4ed0a345a8f0c"},
            },
            required: ['userId']
        }
    })
    async deleteUserBydId(@Body('userId') id: string) {
        this.userService.deleteUser(id);
        return "User has been deleted...";
    }
}