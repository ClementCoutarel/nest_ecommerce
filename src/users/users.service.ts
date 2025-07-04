import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDto from '../auth/dto/CreateUser.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,) {}

  async getUsers(){
    return this.usersRepository.query("SELECT id,name,email FROM users LIMIT 10");
  }

  async getUser(id: number): Promise<User>   {
    const user = await this.usersRepository.findOneBy({id})
     if (!user) {
       throw new NotFoundException(`User with id ${id} not found`);
     }
     return user;
  }

  async getUserByEMail(email: string): Promise<User>   {
    const user = await this.usersRepository.findOneBy({email})
    if (!user) {
      throw new NotFoundException(`User with id ${email} not found`);
    }
    return user;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const result = await this.usersRepository.save({
      ...user,
      password: await hash(user.password, 8)
    });
    if(!result){
      throw new NotFoundException(`User not created`);
    }
    return result;
  }

}

