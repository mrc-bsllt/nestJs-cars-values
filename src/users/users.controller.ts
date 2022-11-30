import { 
  Controller,
  Post,
  Patch,
  Delete,
  Body,
  Param
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('user')
@Serialize(UserDto)
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Patch(':id')
  updateUser(
    @Param('id') id: string, 
    @Body() body: UpdateUserDto
  ) {
    return this.UsersService.update(+id, body)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.UsersService.remove(+id)
  }
}
