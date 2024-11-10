import { Module } from '@nestjs/common';
import { ProductsModule } from './products/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Esto hace que las variables de entorno estén disponibles globalmente
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      dbName: 'productdb',  // Asegúrate de que esta base de datos exista en MongoDB
      bufferCommands: false,  // Deshabilita los comandos de búfer si estás utilizando MongoDB Atlas (si es el caso)
    }),
    ProductsModule,
  ],
  controllers: [AppController],  // Agrega AppController aquí
  providers: [],
})
export class AppModule { }