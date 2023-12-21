import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';

/**
 * Module for handling file uploads.
 */
@Module({
  controllers: [UploadController],
})
export class UploadModule {}