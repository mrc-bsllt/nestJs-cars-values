import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/user.entity'
import { ConflictException } from '@nestjs/common'

describe('AuthService', () => {
  let service: AuthService
  let fakeUsersService: Partial<UsersService>

  beforeEach(async () => {
    fakeUsersService = {
      findOneByEmail: () => Promise.resolve(null),
      saveNewUser: (email: string, password: string) => Promise.resolve(
        {
          id: 1,
          email,
          password
        } as User
      )
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        JwtService
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('creates a new user with a hashed password', async () => {
    const user = await service.signup('test@mail.com', 'passwordtest')
    expect(user).toBeDefined()
    expect(user.password).not.toEqual('passwordtest')
  })

  it('throws an error if user tries to register with an already existing email', async () => {
    fakeUsersService.findOneByEmail = () => Promise.resolve({} as User)

    try {
      await service.signup('test@mail.com', 'passwordtest')
    } catch(error) {
      expect(error).toBeInstanceOf(ConflictException)
    }
  })
})
