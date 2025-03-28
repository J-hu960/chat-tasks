import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';


async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3001','http://localhost:3000'],  
    methods: ['*'],        
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,               

  });
  await app.listen(3000);
}
bootstrap();
