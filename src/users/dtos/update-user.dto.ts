import {
  IsEmail,
  MinLength,
  IsAlphanumeric,
  IsOptional
} from 'class-validator'

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string

  @IsAlphanumeric()
  @MinLength(8)
  @IsOptional()
  password: string
}