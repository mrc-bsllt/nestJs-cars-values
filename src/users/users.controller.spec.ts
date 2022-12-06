import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from './user.entity'
import { UpdateUserDto } from './dtos/update-user.dto'
import { Request } from 'express'
import { UnauthorizedException } from '@nestjs/common'

describe('UsersController', () => {
  let controller: UsersController
  let fakeUsersService: Partial<UsersService>

  beforeEach(async () => {
    fakeUsersService = {
      updateUser: (id: number, payload: UpdateUserDto) => {
        const email = payload.email ? 
          payload.email : 
          'test@mail.com'
        const password = payload.password ? 
          payload.password : 
          'testpassword'

        return Promise.resolve({
          id,
          email,
          password
        } as User)
      }
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        }
      ]
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('returns a changed user', async () => {
    const req = {
      user: {
        id: 10
      }
    } as unknown as Request
    const body = {
      email: 'test@mail.com',
      password: 'testpasswordnuova'
    } as UpdateUserDto

    const user = await controller.updateUser(req, '10', body)
    expect(user).toBeDefined()
    expect(user.email).toBe('test@mail.com')
    expect(user.password).toBe('testpasswordnuova')
  })

  it('throws an error if user is not authhorized', async () => {
    const req = {
      user: {
        id: 10
      }
    } as unknown as Request
    const body = {} as UpdateUserDto

    try {
      await controller.updateUser(req, '2', body)
    } catch(error) {
      expect(error).toBeInstanceOf(UnauthorizedException)
    }
  })
})
