import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{name :'User', schema:UserSchema}]),
  JwtModule.register({
    secret: `${process.env.jwt_secret}`,
    signOptions: { expiresIn: '3600s' },
  }),],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}