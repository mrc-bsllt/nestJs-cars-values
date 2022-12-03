import { Controller } from '@nestjs/common';
import { User } from '../users/user.entity'
import { Serialize } from '../interceptors/serialize.interceptor'

@Controller('users')
@Serialize(User)
export class UsersController {
}
