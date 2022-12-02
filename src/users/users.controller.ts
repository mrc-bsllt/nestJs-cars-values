import { 
  Controller,
  Patch,
  Delete,
  Body,
  Param
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dtos/update-user.dto'
import { Serialize } from '../interceptors/serialize.interceptor'
import { User } from './user.entity'

@Controller('user')
@Serialize(User)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Patch(':id')
  updateUser(
    @Param('id') id: string, 
    @Body() body: UpdateUserDto
  ) {
    return this.usersService.update(+id, body)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }

  @Delete()
  deleteAll() {
    return this.usersService.deleteAll()
  }
}
