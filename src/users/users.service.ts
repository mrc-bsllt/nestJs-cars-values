import { BadRequestException, Injectable, ConflictException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private User: Repository<User>
  ) {}

  findOneByEmail(email: string): Promise<User> {
    return this.User.findOneBy({ email })
  }

  private findOneById(id: number): Promise<User> {
    return this.User.findOneBy({ id })
  }

  saveNewUser(email: string, password: string): Promise<User> {
    const user = this.User.create({
      email,
      password
    })

    return this.User.save(user)
  }

  async updateUser(
    id: number, 
    payload: Partial<User>
  ): Promise<User | never> {
    const user = await this.findOneById(id)
    if(!user) {
      throw new BadRequestException('Utente non trovato!')
    }

    if(payload.email) {
      const isEmailExist = await this.findOneByEmail(payload.email)
      if(isEmailExist) {
        throw new ConflictException('Email già in uso da qualcuno!')
      }
    }
    if(payload.password) {
      payload.password = await bcrypt.hash(payload.password, 12)
    }

    Object.assign(user, payload)
    return this.User.save(user)
  }
}
