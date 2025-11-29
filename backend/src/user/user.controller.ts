import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
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

  @UseGuards(AuthGuard('jwt'))
  @Get('followed-by-both')
  followedByBoth(@Query('x') x: string, @Query('y') y: string) {
    return this.userService.followedByBoth(x, y);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('no-blogs')
  noBlogs() {
    return this.userService.noBlogs();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('no-negative-comments')
  safeBloggers() {
    return this.userService.usersBlogsNoNegative();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('toggle-follow')
  async toggleFollow(@Request() req, @Body('target') targetUsername: string) {
    const follower = req.user.username;
    return this.userService.toggleFollow(follower, targetUsername);
  }
}
