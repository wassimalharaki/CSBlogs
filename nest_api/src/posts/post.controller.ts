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
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

/**
 * Controller class for handling API requests related to posts.
 */
@ApiTags('posts')
@Controller('api/posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {}

    /**
     * Retrieves all posts.
     * @returns An object containing the array of posts.
     */
    @Get('/')
    @ApiOperation({summary: 'Returns all posts'})
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
    @ApiOperation({summary: 'Receives id from params => returns post if exists'})
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
    @ApiOperation({summary: 'Receives title, description, username, and photo from body => creates and returns a post'})
    @ApiBody({
        type: 'object',
        required: true,
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', description: 'Post\'s title', example: "C++"},
                desc: { type: 'string', description: 'Post\'s description', example: "C++ is easy to learn!"},
                username: { type: 'string', description: 'User\'s username', example: "wassim"},
                photo: { type: 'string', description: 'Post\'s image name', example: "1700736851541sieve_eratosthenes.png"},
            },
            required: ['title', 'desc', 'username']
        }
    })
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
    @ApiOperation({summary: 'Receives id, title, description, and username from body => updates and returns a post'})
    @ApiBody({
        type: 'object',
        required: true,
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', description: 'Post\'s image name', example: "655f1c23f5e4ed0a345a8f0d"},
                username: { type: 'string', description: 'User\'s username', example: "wassim"},
                title: { type: 'string', description: 'Post\'s title', example: "C++"},
                desc: { type: 'string', description: 'Post\'s description', example: "C++ is easy to learn!"},
            },
            required: ['title', 'desc', 'username']
        }
    })
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
    @ApiOperation({summary: 'Receives id from params, username from body => deletes a post if exists and belongs to user'})
    @ApiBody({
        type: 'object',
        required: true,
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', description: 'User\'s username', example: "wassim"},
            },
            required: ['username']
        }
    })
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