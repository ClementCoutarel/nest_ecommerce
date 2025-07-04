import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { CurrentUser } from './decorator/current-user.decorator';
import { Response } from 'express';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { JWTAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UsersService) {
    }

    @Post("/login")
    @UseGuards(LocalAuthGuard)
    login(@CurrentUser() user: User,
          @Res({passthrough: true}) response: Response) {
     return this.authService.login(user, response);
    }

    @Get()
    @UseGuards(JWTAuthGuard)
    getUser(){
      return this.userService.getUsers()
    }
}
