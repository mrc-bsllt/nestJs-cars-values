import {
  IsEmail,
  MinLength,
  IsAlphanumeric
} from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsAlphanumeric()
  @MinLength(8)
  password: string;
}