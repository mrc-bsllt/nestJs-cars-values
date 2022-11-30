import {
  IsEmail,
  IsAlphanumeric
} from 'class-validator'

export class SigninUserDto {
  @IsEmail()
  email: string;

  @IsAlphanumeric()
  password: string;
}