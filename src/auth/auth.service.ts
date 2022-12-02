import { 
  Injectable, 
  ConflictException,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { SignupUserDto } from '../users/dtos/signup-user.dto';
import { SigninUserDto } from '../users/dtos/signin-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private User: Repository<User>
  ) {}

  async signup(body: SignupUserDto) {
    const { email, password } = body;
    const userExist = await this.getUserByEmail(email)
    if(userExist) {
      throw new ConflictException('L\'utente esiste già!')
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = this.User.create({
      email,
      password: hashedPassword
    })

    return this.User.save(user);
  }

  async signin(body: SigninUserDto) {
    const { email, password } = body
    const user = await this.getUserByEmail(email)
    if(!user) {
      throw new NotFoundException('L\'utente non esiste!')
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect) {
      throw new BadRequestException('Password non valida!')
    }

    return user
  }

  async chiSono(id: number) {
    if(!id) {
      return 'Non c\'è nessuno loggato!'
    }

    const user = await this.User.findOneBy({ id })
    return user
  }

  private async getUserByEmail(email: string) {
    const user = await this.User.findOneBy({ email })
    return user
  }
}
