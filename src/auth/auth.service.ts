import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { tokenPayload } from './interfaces/token-payload.interface';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private configService: ConfigService,
                private readonly jwtService: JwtService) {}

  login(user: User, response: Response) {
      const expirationAccessToken = new Date()
      expirationAccessToken.setMilliseconds(expirationAccessToken.getTime() + parseInt(
        this.configService.getOrThrow('JWT_EXPIRATION_TIME')
      ));
      const tokenPayload: tokenPayload = {
        userId: user.id.toString(),
      }
     const accessToken = this.jwtService.sign(tokenPayload,{
        secret: this.configService.getOrThrow('JWT_SECRET'),
        expiresIn: `${this.configService.getOrThrow('JWT_EXPIRATION_TIME')}ms`,
      });

    response.cookie('Authentication', accessToken, {httpOnly: true, secure: this.configService.get('NODE_ENV')});
  }

   async verifyUser( email: string, password: string ): Promise<User> {
      try {
        const user:User= await this.userService.getUserByEMail(email);
        const authenticated = await compare(password, user.password);
        console.log({
          authenticated: authenticated,
          user: user.password,
          password
        });
        if(!authenticated) {
          throw new UnauthorizedException();
        }
        return user
      } catch {
        throw new UnauthorizedException();
      }
    }
}
