import { 
  Controller,
  Post,
  Patch,
  Delete,
  Body,
  Param
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    return this.UsersService.create(body)
  }

  @Patch('user/:id')
  updateUser(
    @Param('id') id: string, 
    @Body() body: UpdateUserDto
  ) {
    return this.UsersService.update(+id, body)
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: string) {
    return this.UsersService.remove(+id)
  }
}
