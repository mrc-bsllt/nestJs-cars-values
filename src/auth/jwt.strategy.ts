import { 
  ExtractJwt, 
  Strategy 
} from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { PayloadDto } from './dtos/payload.dto'
import appConfig from '../config/app.config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig().jwtSecret,
    })
  }

  async validate(payload: PayloadDto) {
    return { 
      id: payload.sub, 
      email: payload.email 
    }
  }
}