import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>
  ) {}

  create(body: CreateUserDto) {
    const { email, password } = body;
    const user = this.repo.create({
      email,
      password
    })

    return this.repo.save(user);
  }

  async update(id: number, body: Partial<User>) {
    const user = await this.repo.findOneBy({
      id
    })

    if(!user) {
      return new NotFoundException('Utente non trovato!')
    }

    Object.assign(user, body)
    return this.repo.save(user)
  }
}
