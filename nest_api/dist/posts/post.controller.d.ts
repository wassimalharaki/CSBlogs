/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { PostsService } from './post.service';
export declare class PostsController {
    private readonly postService;
    constructor(postService: PostsService);
    getAllPosts(): Promise<{
        posts: (import("mongoose").Document<unknown, {}, import("./post.schema").Post> & import("./post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getPostById(id: string): Promise<{
        post: import("mongoose").Document<unknown, {}, import("./post.schema").Post> & import("./post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    createPost(title: string, desc: string, username: string, photo: string): Promise<{
        post: import("mongoose").Document<unknown, {}, import("./post.schema").Post> & import("./post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updatePost(id: string, username: string, title: string, desc: string): Promise<(import("mongoose").Document<unknown, {}, import("./post.schema").Post> & import("./post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    }) | "Post not found." | "You can only delete your posts!">;
    deletePost(id: string, username: string): Promise<"Post not found." | "You can only delete your posts!" | "Post has been deleted...">;
}
