import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private User: Repository<User>
  ) {}

  findOneByEmail(email: string): Promise<User> {
    return this.User.findOneBy({ email })
  }

  saveNewUser(email: string, password: string): Promise<User> {
    const user = this.User.create({
      email,
      password
    })

    return this.User.save(user)
  }
}
