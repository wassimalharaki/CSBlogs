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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getAllPosts", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPostById", null);
__decorate([
    (0, common_1.Post)('/'),
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
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('api/posts'),
    __metadata("design:paramtypes", [post_service_1.PostsService])
], PostsController);
//# sourceMappingURL=post.controller.js.map