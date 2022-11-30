import {
  IsEmail,
  MinLength,
  IsAlphanumeric
} from 'class-validator'

export class SignupUserDto {
  @IsEmail()
  email: string;

  @IsAlphanumeric()
  @MinLength(8)
  password: string;
}