import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '60s' },
    })
  ],
  providers: [AuthService, DrizzleService],
  controllers: [AuthController]
})
export class AuthModule {}
