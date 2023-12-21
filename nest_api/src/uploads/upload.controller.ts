import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { storage } from "./storage.config"
  
  
/**
 * Controller for handling file uploads.
 */
@Controller("api/upload")
export class UploadController {
    /**
     * Uploads a file.
     * @param file - The uploaded file.
     * @returns The uploaded file.
     */
    @Post("/")
    @UseInterceptors(
        FileInterceptor(
            "file",
            { storage }
        )
    )
    async upload(@UploadedFile() file) {
        return file;
    }
}