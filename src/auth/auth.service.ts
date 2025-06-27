import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';

@Injectable()
export class AuthService {

    register(@Body() createUser: CreateUserDto){
       return createUser;
    }
}
