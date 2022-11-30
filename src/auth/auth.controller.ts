import { 
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service'
import { SignupUserDto } from '../users/dtos/signup-user.dto';
import { SigninUserDto } from '../users/dtos/signin-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private UsersService: AuthService) {}

  @Post('signup')
  signup(@Body() body: SignupUserDto) {
    return this.UsersService.signup(body)
  }

  @Post('signin')
  signin(@Body() body: SigninUserDto) {
    return this.UsersService.signin(body)
  }

}
