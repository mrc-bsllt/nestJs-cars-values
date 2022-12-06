import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { User } from '../users/user.entity'

describe('AuthController', () => {
  let controller: AuthController
  let fakeAuthService: Partial<AuthService>

  beforeEach(async () => {
    fakeAuthService = {
      signup: (email: string, password: string) => {
        return Promise.resolve(
          {
            id: 10,
            email,
            password
          } as User
        )
      },
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('returns a new user', async () => {
    const user = await controller.signup({ 
      email: 'test@mail.com', 
      password: 'testpassword' 
    })

    expect(user).toBeDefined()
    expect(user.email).toBe('test@mail.com')
    expect(user.password).toBe('testpassword')
  })
})
