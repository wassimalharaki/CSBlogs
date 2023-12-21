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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUserById(id) {
        const user = await this.userService.findById(id);
        return { user };
    }
    async updateUserById(id, password, profilePic) {
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
    async deleteUserBydId(id) {
        this.userService.deleteUser(id);
        return "User has been deleted...";
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Receives id from params => returns user if exists' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Put)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Receives id, password, profilePic from body => updates user if exists' }),
    (0, swagger_1.ApiBody)({
        type: 'object',
        required: true,
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'string', description: 'User\'s id', example: "655f1b57f5e4ed0a345a8f0c" },
                password: { type: 'string', format: 'password', description: 'User\'s password', example: "wassim" },
                profilePic: { type: 'string', description: 'User\'s profile picture', example: "1701013980564pfp.jpeg" },
            },
            required: ['userId']
        }
    }),
    __param(0, (0, common_1.Body)('userId')),
    __param(1, (0, common_1.Body)('password')),
    __param(2, (0, common_1.Body)('profilePic')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserById", null);
__decorate([
    (0, common_1.Delete)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Receives id from body => deletes user if exists' }),
    (0, swagger_1.ApiBody)({
        type: 'object',
        required: true,
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'string', description: 'User\'s id', example: "655f1b57f5e4ed0a345a8f0c" },
            },
            required: ['userId']
        }
    }),
    __param(0, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUserBydId", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('api/users'),
    __metadata("design:paramtypes", [user_service_1.UsersService])
], UsersController);
//# sourceMappingURL=user.controller.js.map