import { IsEmail,  IsNumber, IsString } from "class-validator";

export enum Role {
    "Super Admin" = 1,
    "Admin" = 2,
    "User" = 3,
    "Guest" = 4,
}

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsNumber()
    role_id: Role;
} 