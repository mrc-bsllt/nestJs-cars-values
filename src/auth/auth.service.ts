import { 
  Injectable, 
  UnauthorizedException,
  ConflictException,
  BadRequestException
} from '@nestjs/common'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dtos/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User | never> {
    const user = await this.usersService.findOneByEmail(email)
    if(!user) {
      throw new BadRequestException('Utente non trovato!')
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect) {
      throw new UnauthorizedException('La password non corrisponde!')
    }

    return user
  }

  async signup(email, password): Promise<User | never> {
    const userExist = await this.usersService.findOneByEmail(email)
    if(userExist) {
      throw new ConflictException('L\'utente esiste già!')
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await this.usersService.saveNewUser(email, hashedPassword)
    return user
  }

  async login(user: User): Promise<LoginDto> {
    const payload = { sub: user.id, email: user.email }
    
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
