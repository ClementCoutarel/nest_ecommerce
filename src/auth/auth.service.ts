import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';
import * as schema from '../drizzle/schema'
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Injectable()
export class AuthService {
    constructor( private dbService : DrizzleService){}

     register(@Body() createUser: CreateUserDto){
       this.dbService.db.insert(schema.users).values(createUser)
       return "User created"
    }
}
