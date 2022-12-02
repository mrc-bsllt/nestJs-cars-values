import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private User: Repository<User>
  ) {}

  async update(
    id: number, 
    body: Partial<User>
  ): Promise<User | never>
  {
    const user = await this.User.findOneBy({ id })
    if(!user) {
      throw new NotFoundException('Utente non trovato!')
    }

    if(body?.password) {
      body.password = await bcrypt.hash(body.password, 12)
    }
    Object.assign(user, body)

    return this.User.save(user)
  }

  async remove(id: number): Promise<User | never> {
    const user = await this.User.findOneBy({ id })
    if(!user) {
      throw new NotFoundException('Utente non trovato!')
    }

    return this.User.remove(user)
  }

  async deleteAll(): Promise<User[]> {
    const users = await this.User.find()
    return this.User.remove(users)
  }
}
