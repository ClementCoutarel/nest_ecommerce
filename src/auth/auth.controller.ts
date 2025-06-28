import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import CreateUserDto from './dto/CreateUser.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { CurrentUser } from './decorator/current-user.decorator';
import { Response } from 'express';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UsersService) {
    }

    @Post("/login")
    @UseGuards(LocalAuthGuard)
    login(@CurrentUser() user: User, @Res({passthrough: true}) response: Response) {
      this.authService.login(user, response);
    }
}
