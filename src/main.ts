import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';


async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001',  
    methods: ['GET', 'POST'],        
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,               

  });
  await app.listen(8080)
}
bootstrap();
