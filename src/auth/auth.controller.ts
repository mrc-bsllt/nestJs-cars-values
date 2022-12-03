import { 
  Controller,
  Request,
  Body,
  Post,
  UseGuards,
  Get
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from '../users/user.entity'
import { SignupUserDto } from '../users/dtos/signup-user.dto'
import { Serialize } from '../interceptors/serialize.interceptor'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
@Serialize(User)
export class AuthController {
constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() user: SignupUserDto): Promise<User> {
    const { email, password } = user
    return this.authService.signup(email, password)
  }
}
