import { BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin(origin, callback) {
      const isOriginValid = new RegExp('localhost', 'g').test(origin);
      if (!origin || isOriginValid) {
        callback(null, true);
      } else {
        callback(new BadRequestException('Not allowed by CORS'));
      }
    },
  });

  await app.listen(3001);
  console.log('Listening @ port 3001');
}
bootstrap();
