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
}
