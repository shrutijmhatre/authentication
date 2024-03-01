import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname,'../..','client', 'dist'),
  }),
  ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.DB_URI),
  UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
