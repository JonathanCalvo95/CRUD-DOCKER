import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para todos los orígenes
  app.enableCors({
    origin: '*',                              // Permitir todos los orígenes
    methods: 'GET,POST,PUT,DELETE',           // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization'  // Headers permitidos
  });

  await app.listen(port);
  console.log('Application is running on: http://localhost:' + port);
}
bootstrap();
