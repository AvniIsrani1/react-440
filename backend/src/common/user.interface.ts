export interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// DTOs
import { IsNotEmpty, IsString, Length } from 'class-validator';
export class SignupDto {
  @Length(1, 50)
  @IsString()
  username: string;

  @IsNotEmpty()
  @Length(8, 255)
  password: string;

  @IsNotEmpty()
  @Length(8, 255)
  confirmPassword: string;

  @Length(1, 50)
  @IsString()
  firstName: string;

  @Length(1, 50)
  @IsString()
  lastName: string;

  @Length(1, 255)
  email: string;

  @Length(1, 15)
  @IsString()
  phone: string;
}

export class LoginDto {
  //   @Length(1, 50)
  @IsNotEmpty()
  @IsString()
  username: string;

  //   @Length(8, 255)
  @IsNotEmpty()
  @IsString()
  password: string;
}
