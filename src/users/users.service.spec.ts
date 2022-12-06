import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { BadRequestException } from '@nestjs/common'

describe('UsersService', () => {
  let service: UsersService
  let repo: Repository<User>
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
            findOneBy: ({ id }) => {
              const response = user.id === id ?
                user :
                null
                
              return Promise.resolve(response)
            }
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
})
