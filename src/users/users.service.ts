import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>
  ) {}

  async update(id: number, body: Partial<User>) {
    const user = await this.repo.findOneBy({ id })
    if(!user) {
      throw new NotFoundException('Utente non trovato!')
    }

    Object.assign(user, body)
    return this.repo.save(user)
  }

  async remove(id: number) {
    const user = await this.repo.findOneBy({ id })
    if(!user) {
      throw new NotFoundException('Utente non trovato!')
    }

    return this.repo.remove(user)
  }
}
