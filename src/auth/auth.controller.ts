import { 
  Controller,
  Post,
  Body,
  Session
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignupUserDto } from '../users/dtos/signup-user.dto'
import { SigninUserDto } from '../users/dtos/signin-user.dto'
import { Serialize } from '../interceptors/serialize.interceptor'
import { UserDto } from '../users/dtos/user.dto'

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private UsersService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() body: SignupUserDto,
    @Session() session: any
  ) {
    const user = await this.UsersService.signup(body)
    session.userId = user.id

    return user
  }

  @Post('signin')
  async signin(
    @Body() body: SigninUserDto,
    @Session() session: any
  ) {
    const user = await this.UsersService.signin(body)
    session.userId = user.id

    return user
  }

  @Post('signout')
  signout(@Session() session: any) {
    session.userId = null
  }
}
