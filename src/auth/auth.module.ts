import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';
import { User } from '../users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule],
  providers: [AuthService, UsersService, LocalAuthGuard, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
