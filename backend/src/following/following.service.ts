import {Injectable, BadRequestException} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class FollowingService {
  constructor(private readonly prisma: PrismaService) {}

  async isFollowing(followerUsername: string, followingUsername: string): Promise<boolean>{
    const follower = await this.prisma.user.findUnique({ where: { username: followerUsername } });
    const target = await this.prisma.user.findUnique({ where: { username: followingUsername } });

    if(!follower || !target) return false;

    const relation = await this.prisma.following.findUnique({
      where: {
        followerId_followingId:{
          followerId: follower.id,
          followingId: target.id,
        },
      },
    });

    return !!relation;
  }

  async follow(followerUsername: string, followingUsername: string) {
    const follower = await this.prisma.user.findUnique({ where: { username: followerUsername } });
    const target = await this.prisma.user.findUnique({ where: { username: followingUsername } });

    if(!follower || !target) throw new BadRequestException('User not found');

    return this.prisma.following.create({
      data:{
        followerId: follower.id,
        followingId: target.id,
      },
    });
  }

  async unfollow(followerUsername: string, followingUsername: string){
    const follower = await this.prisma.user.findUnique({ where: { username: followerUsername } });
    const target = await this.prisma.user.findUnique({ where: { username: followingUsername } });

    if(!follower || !target) throw new BadRequestException('User not found');

    return this.prisma.following.delete({
      where:{
        followerId_followingId: {
          followerId: follower.id,
          followingId: target.id,
        },
      },
    });
  }

  async getFollowers(username: string){
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {followers: {include: {follower: true }}},
    });
    if (!user) throw new BadRequestException('User not found');

    return user.followers.map(f => f.follower);
  }

  async getFollowing(username: string){
    const user = await this.prisma.user.findUnique({
      where: {username},
      include: {following: {include: {following: true}}},
    });
    if(!user) throw new BadRequestException('User not found');

    return user.following.map(f => f.following);
  }
}