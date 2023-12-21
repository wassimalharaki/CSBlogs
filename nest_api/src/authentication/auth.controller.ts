import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controller responsible for handling authentication-related requests.
 */
@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * Handles the login request.
     * @param username - The username of the user.
     * @param pwd - The password of the user.
     * @returns The user object if login is successful, otherwise returns 'Wrong credentials!'.
     */
    @Post('/login')
    @ApiOperation({summary: 'Receives username and password from request body => checks if they match'})
    @ApiBody({
        type: 'object',
        required: true,
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', description: 'User\'s username', example: "wassim"},
                password: { type: 'string', format: 'password', description: 'User\'s password', example: "wassim" }
            },
            required: ['username', 'password']
        }
    })
    async login(@Body('username') username: string, @Body('password') pwd: string) {
        try {
            const user = await this.authService.login(username, pwd);
            return user;
        }
        catch (e) {
            return 'Wrong credentials!';
        }
    }

    /**
     * Handles the registration request.
     * @param username - The username of the user.
     * @param email - The email of the user.
     * @param pwd - The password of the user.
     * @returns The registered user object.
     */
    @Post('/register')
    @ApiOperation({summary: 'Receives username, email, and password from body => creates new user after validations'})
    @ApiBody({
        type: 'object',
        required: true,
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', description: 'User\'s username', example: "name123"},
                email: { type: 'string', format: 'email', description: 'User\'s email', example: "name@test.com" },
                password: { type: 'string', format: 'password', description: 'User\'s password', example: "secretpassword" }
            },
            required: ['username', 'password', 'email']
        }
    })
    async register(
            @Body('username') username: string,
            @Body('email') email: string,
            @Body('password') pwd: string) {
        const user = this.authService.register({
            username: username,
            email: email,
            password: pwd
        });
        return user;
    }
}