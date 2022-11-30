import { Injectable, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dtos/create-user.dto';

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

    const user = this.repo.create({
      email,
      password
    })

    return this.repo.save(user);
  }

  private async getUserByEmail(email: string) {
    const user = await this.repo.findOneBy({ email })
    return user
  }
}
