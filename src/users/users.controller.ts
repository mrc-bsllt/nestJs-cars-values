import { 
  Body, 
  Controller, 
  Param, 
  Patch,
  Req,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { User } from '../users/user.entity'
import { Serialize } from '../interceptors/serialize.interceptor'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dtos/update-user.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { Request } from 'express'

@Controller('users')
@Serialize(User)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() payload: UpdateUserDto
  ): Promise<User | never> {
    const { id: userId } = req.user as User
    if(userId !== +id) {
      throw new UnauthorizedException()
    }

    return this.usersService.updateUser(id, payload)
  }
}
