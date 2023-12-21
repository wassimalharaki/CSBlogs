import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

/**
 * Starts the Nest.js application.
 * @returns {Promise<void>}
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet({
    crossOriginResourcePolicy: false
  }));
  await app.listen(5000);
}
bootstrap();
