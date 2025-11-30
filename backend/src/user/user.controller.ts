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

  //KV add-----------------------------------------------------------------------------------------
  //For follow functionallity: Both searches for a user and checks if the logged-in user already
  //follows this searched user
  @UseGuards(AuthGuard('jwt'))
  @Get('user-with-follow-status')
  async userWithFollowStatus(@Query('username') username: string, @Request() req){
    const currentUser = req.user.username;//get the current user

    const user = await this.userService.findByUsername(username);//check if the target user exists
    if(!user)//target user doesn't exist
      return null;//return no results

  const isFollowing = await this.userService.isFollowing(currentUser, username);//target exists:
                                                                                //check following
  return {//return results
    username: user.username,
    //email: user.email,
    isFollowing,
  };
}
//-------------------------------------------------------------------------------------------------

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
  noNegativeComments() {
    return this.userService.usersBlogsNoNegative();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('toggle-follow')
  async toggleFollow(@Request() req, @Body('target') targetUsername: string) {
    const follower = req.user.username;
    return this.userService.toggleFollow(follower, targetUsername);
  }
}
