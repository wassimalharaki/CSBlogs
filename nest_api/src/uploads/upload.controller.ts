import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { storage } from "./storage.config"
import { ApiExcludeController } from "@nestjs/swagger";
  
  
/**
 * Controller for handling file uploads.
 */
@Controller("api/upload")
@ApiExcludeController()
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