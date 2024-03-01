import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/user.dto';
import {InjectModel} from '@nestjs/mongoose';
import {User} from './user.schema';
import {Model} from 'mongoose';
import {UserResponseType} from './types/userResponse.type';
import {LoginDto} from './dto/login.dto';
import {compare} from 'bcrypt';
import {sign} from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({email: createUserDto.email})

    if (user) {
      throw new HttpException('Email is already taken', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const createdUser = new this.userModel(createUserDto)
    return createdUser.save()
  }

  async loginUser(loginDto: LoginDto): Promise<User> {
    const user = await this.userModel.findOne({email: loginDto.email}).select('+password')

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const isPasswordCorrect = await compare(loginDto.password, user.password)

    if (!isPasswordCorrect) {
      throw new HttpException('Incorrect password', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    return user
  }

  buildUserResponse(userEntity: User): UserResponseType {
    return {
      name: userEntity.name,
      email: userEntity.email,
      token: this.generateJwt(userEntity)
    }
  }

  generateJwt(userEntity: User): string {
    return sign({email: userEntity.email}, process.env.JWT_SECRET)
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({email})
  }
}