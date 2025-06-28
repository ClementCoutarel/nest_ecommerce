import { Body, Controller,  Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){
    }

    @Post('/')
    register(@Body() data: CreateUserDto){
       try{
        this.authService.register(data)
       } catch(e){
        return console.log(e)
       }
        return data
    } 
}
