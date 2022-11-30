import { 
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service'
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private UsersService: AuthService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    return this.UsersService.signup(body)
  }
}
