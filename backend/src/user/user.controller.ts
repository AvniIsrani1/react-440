import {Controller, Get, Query, Request, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {AuthGuard} from '@nestjs/passport';
import {FollowingService} from '../following/following.service';

@Controller('user')
export class UserController{
  constructor(
    private readonly userService: UserService,
    private readonly followingService: FollowingService,//injected properly now
  ) {}

@UseGuards(AuthGuard('jwt'))
@Get('username')
async getUser(@Query('username') username: string, @Request() req){
  const user = await this.userService.findByUsername(username);
  if(!user) return null;

  let isFollowing = false;
  if(req.user?.username)
    isFollowing = await this.followingService.isFollowing(req.user.username, username);
  
  const {password, ...info} = user;
  return {...info, isFollowing};
}

  // Protected: only authenticated users can list all users
  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  getAll() {
    return this.userService.getAll();
  }

  // Protected: only authenticated users can view their own profile
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Request() req) {
    const username = req.user.username;
    return this.userService.findByUsername(username);
  }
}