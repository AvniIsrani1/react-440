import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from 'src/common/user.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    validateCredentials(@Body() body: LoginDto){
        return this.authService.login(body.username, body.password);
    }

    @Post('register')
    create(@Body() body: SignupDto){
        return this.authService.create(body);
    }
}
