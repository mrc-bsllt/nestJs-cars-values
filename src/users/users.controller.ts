import { 
  Controller,
  Post,
  Body
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
@Controller('auth')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    return this.UsersService.create(body)
  }

  @Post('user')
  updateUser(@Body() body: Partial<User>) {
    const { id } = body
    delete body.id

    return this.UsersService.update(id, body)
  }
}
