import { IsNotEmpty, IsEmail, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, {message: "Password should have minimum 8 characters"})
  @Matches(/[a-zA-Z]/,{message:'Password should contain at least 1 letter'})
  @Matches(/[0-9]/,{message: 'Password should contain at least 1 number'})
  @Matches(/\W/,{message:'Password should contain at least 1 special character'})
  password: string;
}