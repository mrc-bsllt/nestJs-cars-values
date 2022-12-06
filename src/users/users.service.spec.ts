import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { 
  BadRequestException,
  ConflictException
} from '@nestjs/common'

describe('UsersService', () => {
  let service: UsersService
  let repo: Repository<User>
  interface FindOneByDto {
    id?: keyof User & number
    email?: keyof User & string
  }
  const user = {
    id: 10,
    email: 'test@mail.com',
    password: 'testpassword'
  } as User

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: (value: FindOneByDto) => {
              const field = value.id ? 'id' : 'email'
              const response = user[field] === value[field] ?
                user :
                null
                
              return Promise.resolve(response)
            },
            save: (user: Partial<User>) => Promise.resolve(user),
          }
        }
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    repo = module.get<Repository<User>>(getRepositoryToken(User))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('throws an error if user does not exist', async () => {
    await expect(
      service.updateUser(2, {})
    ).rejects
    .toBeInstanceOf(BadRequestException)
  })

  it('throws an error if the user changes the email to an existing one', async () => {
    await expect(
      service.updateUser(10, { email: 'test@mail.com' })
    ).rejects
    .toBeInstanceOf(ConflictException)
  })

  it('returns same user with the changed email', async () => {
    const user = await service.updateUser(10, { email: 'new@mail.com' })
    expect(user.id).toBe(10)
    expect(user.email).not.toBe('test@mail.com')
  })

  it('returns same user with the changed password', async () => {
    const user = await service.updateUser(10, { password: 'newpassword' })
    expect(user.id).toBe(10)
    expect(user.password).not.toBe('testpassword')
  })
})
