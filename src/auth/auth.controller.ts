import { 
  Controller,
  Post,
  Get,
  Body,
  Session
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignupUserDto } from '../users/dtos/signup-user.dto'
import { SigninUserDto } from '../users/dtos/signin-user.dto'
import { Serialize } from '../interceptors/serialize.interceptor'
import { User } from '../users/user.entity'

@Controller('auth')
@Serialize(User)
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() body: SignupUserDto,
    @Session() session: any
  ): Promise<User> 
  {
    const user = await this.AuthService.signup(body)
    session.userId = user.id

    return user
  }

  @Post('signin')
  async signin(
    @Body() body: SigninUserDto,
    @Session() session: any
  ): Promise<User> 
  {
    const user = await this.AuthService.signin(body)
    session.userId = user.id

    return user
  }

  @Post('signout')
  signout(@Session() session: any): void {
    session.userId = null
  }

  @Get('chi-sono')
  async chiSono(@Session() session: any): Promise<User | string> {

    const { userId } = session
    const user = await this.AuthService.chiSono(userId)
    
    return user
  }
}
