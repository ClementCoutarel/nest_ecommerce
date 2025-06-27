import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){
    }

    @Get('/')
    register(@Body() data: CreateUserDto){
        this.authService.register(data)
        return 'created'
    } 
}
