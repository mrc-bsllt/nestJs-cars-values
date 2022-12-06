import { 
  Controller,
  Req,
  Body,
  Post,
  UseGuards,
  Get
} from '@nestjs/common'
import { Request } from 'express'
import { AuthService } from './auth.service'
import { User } from '../users/user.entity'
import { SignupUserDto } from '../users/dtos/signup-user.dto'
import { Serialize } from '../interceptors/serialize.interceptor'
import { LocalAuthGuard } from './local-auth.guard'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
@Serialize(User)
export class AuthController {
constructor(private authService: AuthService) {}

  @Post('signup')
  signup(
    @Body() user: SignupUserDto): Promise<User> {
    const { email, password } = user
    return this.authService.signup(email, password)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request) {
    return this.authService.login(req.user as User)
  }
}
