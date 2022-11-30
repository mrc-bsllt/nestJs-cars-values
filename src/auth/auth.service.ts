import { Injectable, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>
  ) {}

  async signup(body: CreateUserDto) {
    const { email, password } = body;
    const userExist = await this.getUserByEmail(email)
    if(userExist) {
      throw new ConflictException('L\'utente esiste già!')
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = this.repo.create({
      email,
      password: hashedPassword
    })

    return this.repo.save(user);
  }

  private async getUserByEmail(email: string) {
    const user = await this.repo.findOneBy({ email })
    return user
  }
}
