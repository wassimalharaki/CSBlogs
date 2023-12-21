import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentication/auth.module';
import { PostsModule } from './posts/post.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadModule } from './uploads/upload.module';

/**
 * The main module of the application.
 */
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/CSBlog'),
    UsersModule,
    AuthModule,
    PostsModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images'),
      serveRoot: '/images/'
    })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
