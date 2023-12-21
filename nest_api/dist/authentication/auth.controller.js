"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(username, pwd) {
        try {
            const user = await this.authService.login(username, pwd);
            return user;
        }
        catch (e) {
            return 'Wrong credentials!';
        }
    }
    async register(username, email, pwd) {
        const user = this.authService.register({
            username: username,
            email: email,
            password: pwd
        });
        return user;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/login'),
    (0, swagger_1.ApiOperation)({ summary: 'Receives username and password from request body => checks if they match' }),
    (0, swagger_1.ApiBody)({
        type: 'object',
        required: true,
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', description: 'User\'s username', example: "wassim" },
                password: { type: 'string', format: 'password', description: 'User\'s password', example: "wassim" }
            },
            required: ['username', 'password']
        }
    }),
    __param(0, (0, common_1.Body)('username')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/register'),
    (0, swagger_1.ApiOperation)({ summary: 'Receives username, email, and password from body => creates new user after validations' }),
    (0, swagger_1.ApiBody)({
        type: 'object',
        required: true,
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', description: 'User\'s username', example: "name123" },
                email: { type: 'string', format: 'email', description: 'User\'s email', example: "name@test.com" },
                password: { type: 'string', format: 'password', description: 'User\'s password', example: "secretpassword" }
            },
            required: ['username', 'password', 'email']
        }
    }),
    __param(0, (0, common_1.Body)('username')),
    __param(1, (0, common_1.Body)('email')),
    __param(2, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map