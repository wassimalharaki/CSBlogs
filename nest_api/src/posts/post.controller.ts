import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { PostsService } from './post.service';

/**
 * Controller class for handling API requests related to posts.
 */
@Controller('api/posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {}

    /**
     * Retrieves all posts.
     * @returns An object containing the array of posts.
     */
    @Get('/')
    async getAllPosts() {
        const posts = await this.postService.findAll();
        return { posts };
    }

    /**
     * Retrieves a post by its ID.
     * @param id - The ID of the post.
     * @returns An object containing the post.
     */
    @Get('/:id')
    async getPostById(@Param('id') id: string) {
        const post = await this.postService.findPostById(id);
        return { post };
    }

    /**
     * Creates a new post.
     * @param title - The title of the post.
     * @param desc - The description of the post.
     * @param username - The username of the post author.
     * @param photo - The photo URL of the post.
     * @returns An object containing the created post.
     */
    @Post('/')
    async createPost(
        @Body('title') title: string,
        @Body('desc') desc: string,
        @Body('username') username: string,
        @Body('photo') photo: string
    ) {
        const post = await this.postService.createPost({
            title, desc, username, photo
        });
        return { post };
    }

    /**
     * Updates an existing post.
     * @param id - The ID of the post to be updated.
     * @param username - The username of the post author.
     * @param title - The new title of the post.
     * @param desc - The new description of the post.
     * @returns The updated post if successful, or an error message if the post is not found or the user is not authorized.
     */
    @Put('/')
    async updatePost(
        @Body('id') id: string,
        @Body('username') username: string,
        @Body('title') title: string, 
        @Body('desc') desc: string
    ) {
        const post = await this.postService.findPostById(id);
        if (!post)
            return "Post not found.";
        if (post.username != username)
            return "You can only delete your posts!";
        return await this.postService.updatePostById(id, { title, desc });
    }

    /**
     * Deletes a post by its ID.
     * @param id - The ID of the post to be deleted.
     * @param username - The username of the post author.
     * @returns A success message if the post is deleted, or an error message if the post is not found or the user is not authorized.
     */
    @Delete('/:id')
    async deletePost(@Param('id') id: string, @Body('username') username: string) {
        const post = await this.postService.findPostById(id);
        if (!post)
            return "Post not found.";
        if (post.username != username)
            return "You can only delete your posts!";
        await this.postService.deletePostById(id);
        return "Post has been deleted...";
    }
}