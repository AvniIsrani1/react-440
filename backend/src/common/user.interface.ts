export interface User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

// DTOs
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class SignupDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @MinLength(8)
    confirmPassword: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;
}

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}