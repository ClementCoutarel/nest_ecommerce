import { Body, Post, Controller, HttpException, HttpStatus } from '@nestjs/common';
import CreateUserDto from '../auth/dto/CreateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('')
  async createUser(@Body() user: CreateUserDto){
    try{
      const newUser = await this.usersService.createUser(user)
      if (!newUser){
        throw new HttpException('User already exists', HttpStatus.NOT_FOUND)
      }
    }catch(err){
      throw  new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
