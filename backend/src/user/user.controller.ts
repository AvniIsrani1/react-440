import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, SignupDto} from '../common/user.interface';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    getAll(){
        return this.userService.getAll();
    }

    @Post('login')
    validateCredentials(@Body() body: LoginDto){
        return this.userService.validateCredentials(body.username, body.password);
    }

    @Post('register')
    create(@Body() body: SignupDto){
        return this.userService.create(body);
    }

}
