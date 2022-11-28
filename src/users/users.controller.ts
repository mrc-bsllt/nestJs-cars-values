import { 
  Controller,
  Get,
  Query,
  Post,
  Body,
  NotFoundException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserDto } from './dtos/find-user.dto';
@Controller('auth')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    return this.UsersService.create(body)
  }

  @Get('user')
  async findUser(@Query() queries: FindUserDto) {
    const user = await this.UsersService.findOneBy(queries)
    
    if(!user) {
      return new NotFoundException('L\'utente non esiste')
    }

    return user
  }
}
