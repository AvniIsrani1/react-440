import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, SignupDto } from '../common/user.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  getAll() {
    return this.userService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('username')
  getUser(@Query('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Request() req) {
    const username = req.user.username;
    return this.userService.findByUsername(username);
  }
}
