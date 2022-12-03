import { 
  Injectable, 
  UnauthorizedException,
  ConflictException,
  BadRequestException
} from '@nestjs/common'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email, password) {
    const userExist = await this.usersService.findOneByEmail(email)
    if(userExist) {
      throw new ConflictException('L\'utente esiste già!')
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await this.usersService.saveNewUser(email, hashedPassword)
    return user
  }

  async validateUser(email: string, password: string): Promise<User | never> {
    const user = await this.usersService.findOneByEmail(email)
    if(!user) {
      throw new BadRequestException('Utente non trovato!')
    }

    const isPasswordCorrect = bcrypt.compare(password, user.password)
    if(!isPasswordCorrect) {
      throw new UnauthorizedException('La password non corrisponde!')
    }

    return user
  }
}
