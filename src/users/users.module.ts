import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService]
})
export class UsersModule {}
