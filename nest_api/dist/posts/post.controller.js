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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const swagger_1 = require("@nestjs/swagger");
let PostsController = class PostsController {
    constructor(postService) {
        this.postService = postService;
    }
    async getAllPosts() {
        const posts = await this.postService.findAll();
        return { posts };
    }
    async getPostById(id) {
        const post = await this.postService.findPostById(id);
        return { post };
    }
    async createPost(title, desc, username, photo) {
        const post = await this.postService.createPost({
            title, desc, username, photo
        });
        return { post };
    }
    async updatePost(id, username, title, desc) {
        const post = await this.postService.findPostById(id);
        if (!post)
            return "Post not found.";
        if (post.username != username)
            return "You can only delete your posts!";
        return await this.postService.updatePostById(id, { title, desc });
    }
    async deletePost(id, username) {
        const post = await this.postService.findPostById(id);
        if (!post)
            return "Post not found.";
        if (post.username != username)
            return "You can only delete your posts!";
        await this.postService.deletePostById(id);
        return "Post has been deleted...";
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Returns all posts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getAllPosts", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Receives id from params => returns post if exists' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPostById", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Receives title, description, username, and photo from body => creates and returns a post' }),
    (0, swagger_1.ApiBody)({
        type: 'object',
        required: true,
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', description: 'Post\'s title', example: "C++" },
                desc: { type: 'string', description: 'Post\'s description', example: "C++ is easy to learn!" },
                username: { type: 'string', description: 'User\'s username', example: "wassim" },
                photo: { type: 'string', description: 'Post\'s image name', example: "1700736851541sieve_eratosthenes.png" },
            },
            required: ['title', 'desc', 'username']
        }
    }),
    __param(0, (0, common_1.Body)('title')),
    __param(1, (0, common_1.Body)('desc')),
    __param(2, (0, common_1.Body)('username')),
    __param(3, (0, common_1.Body)('photo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
__decorate([
    (0, common_1.Put)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Receives id, title, description, and username from body => updates and returns a post' }),
    (0, swagger_1.ApiBody)({
        type: 'object',
        required: true,
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', description: 'Post\'s image name', example: "655f1c23f5e4ed0a345a8f0d" },
                username: { type: 'string', description: 'User\'s username', example: "wassim" },
                title: { type: 'string', description: 'Post\'s title', example: "C++" },
                desc: { type: 'string', description: 'Post\'s description', example: "C++ is easy to learn!" },
            },
            required: ['title', 'desc', 'username']
        }
    }),
    __param(0, (0, common_1.Body)('id')),
    __param(1, (0, common_1.Body)('username')),
    __param(2, (0, common_1.Body)('title')),
    __param(3, (0, common_1.Body)('desc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Receives id from params, username from body => deletes a post if exists and belongs to user' }),
    (0, swagger_1.ApiBody)({
        type: 'object',
        required: true,
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', description: 'User\'s username', example: "wassim" },
            },
            required: ['username']
        }
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
exports.PostsController = PostsController = __decorate([
    (0, swagger_1.ApiTags)('posts'),
    (0, common_1.Controller)('api/posts'),
    __metadata("design:paramtypes", [post_service_1.PostsService])
], PostsController);
//# sourceMappingURL=post.controller.js.map