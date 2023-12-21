import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * Controller responsible for handling authentication-related requests.
 */
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