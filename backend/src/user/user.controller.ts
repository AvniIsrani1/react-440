import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, SignupDto} from '../common/user.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getAll(){
        return this.userService.getAll();
    }
}
