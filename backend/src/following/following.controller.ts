import {Controller, Post, Delete, Get, Body, Param, Req, UseGuards} from '@nestjs/common';
import {FollowingService} from './following.service';
import {AuthGuard} from '@nestjs/passport';

@Controller('following')
export class FollowingController{
  constructor(private readonly followingService: FollowingService) {}

  //Protected: only authenticated users can follow
  @UseGuards(AuthGuard('jwt'))
  @Post('follow')
  async follow(
    @Body() body: { followingUsername: string },
    @Req() req,
  ){
    const followerUsername = req.user?.username;
    await this.followingService.follow(followerUsername, body.followingUsername);

    //Return updated follow status
    return {isFollowing: true};
  }

  //Protected: only authenticated users can unfollow
  @UseGuards(AuthGuard('jwt'))
  @Delete('unfollow')
  async unfollow(
    @Body() body: { followingUsername: string },
    @Req() req,
  ){
    const followerUsername = req.user?.username;
    await this.followingService.unfollow(followerUsername, body.followingUsername);

    //Return updated follow status
    return {isFollowing: false};
  }

  //Public: anyone can view followers of a user
  @Get(':username/followers')
  async getFollowers(@Param('username') username: string){
    return this.followingService.getFollowers(username);
  }

  // 🌐 Public: anyone can view who a user is following
  @Get(':username/following')
  async getFollowing(@Param('username') username: string){
    return this.followingService.getFollowing(username);
  }
}