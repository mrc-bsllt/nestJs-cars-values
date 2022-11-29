import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>
  ) {}

  async create(body: CreateUserDto) {
    const { email, password } = body;
    const userExist = await this.getUserByEmail(email)

    if(userExist) {
      return new ConflictException('L\'utente esiste già!')
    }

    const user = this.repo.create({
      email,
      password
    })

    return this.repo.save(user);
  }

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

  private async getUserByEmail(email: string) {
    const user = await this.repo.findOneBy({ email })
    return user
  }
}
