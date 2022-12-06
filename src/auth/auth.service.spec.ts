import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/user.entity'
import { 
  ConflictException,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common'

describe('AuthService', () => {
  let service: AuthService
  let fakeUsersService: Partial<UsersService>

  beforeEach(async () => {
    const users: User[] = []
    fakeUsersService = {
      findOneByEmail: (email: string) => {
        const [user] = users.filter(u => u.email === email)
        return Promise.resolve(user)
      },
      saveNewUser: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 9999999),
          email,
          password
        } as User
        users.push(user)

        return Promise.resolve(user)
      }
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
    await service.signup('test@mail.com', 'passwordtest')
    await expect(
      service.signup('test@mail.com', 'passwordtest')
      ).rejects
      .toBeInstanceOf(ConflictException)
  })

  it('throws an error if the user tries to singin with a non-existent email', async () => {
    await expect(
      service.validateUser('test@mail.com', 'passwordtest')
    ).rejects
    .toBeInstanceOf(BadRequestException)
  })

  it('throws an error if the user tries to singin with an invalid password', async () => {
    await service.signup('test@mail.com', 'testpassword')
    await expect(
      service.validateUser('test@mail.com', 'wrongpassword')
    ).rejects
    .toBeInstanceOf(UnauthorizedException)
  })

  it('returns a user if correct password and email is provided', async () => {
    await service.signup('test@mail.com', 'testpassword')
    const user = await service.validateUser('test@mail.com', 'testpassword')

    expect(user).toBeDefined()
  })
})
