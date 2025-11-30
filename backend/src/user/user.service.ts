import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from 'src/common/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    // return all user information (without passwords)
    const users = await this.prisma.user.findMany();
    return users.map(({ password, ...info }) => info);
  }

  async findByUsername(username: string) {
    return await this.prisma.user.findUnique({ where: { username } });
  }

  //KV add-----------------------------------------------------------------------------------------
  //Helper function for Follow others: checks if one user is following another
  async isFollowing(follower: string, target: string): Promise<boolean> {
    if (!follower || !target) return false; //missing input
    if (follower === target) return false; // you don't "follow" yourself

    const follow = await this.prisma.follow.findUnique({
      where: { follower_following: { follower, following: target } }, //check if follower follows target
    });

    return !!follow; //return result
  }
  //-----------------------------------------------------------------------------------------------

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findByPhone(phone: string) {
    return await this.prisma.user.findUnique({ where: { phone } });
  }

  async followedByBoth(userX: string, userY: string) {
    return this.prisma.$queryRaw`
    SELECT f1.following AS username
    FROM Follow f1
    JOIN Follow f2
      ON f1.following = f2.following
    WHERE f1.follower = ${userX}
      AND f2.follower = ${userY};
  `;
  }
  // async followedByBoth2(x: string, y: string) {
  //   const usersFollowedByX = await this.prisma.follow.findMany({
  //     where: { follower: x },
  //     select: { following: true },
  //   });

  //   const followedByX = new Set(usersFollowedByX.map((u) => u.following));

  //   const usersFollowedByY = await this.prisma.follow.findMany({
  //     where: { follower: y },
  //     select: { following: true },
  //   });

  //   return usersFollowedByY
  //     .filter((u) => followedByX.has(u.following))
  //     .map((u) => u.following);
  // }

  async noBlogs() {
    return this.prisma.$queryRaw`
    SELECT u.username
    FROM User u
    LEFT JOIN Blog b ON u.username = b.authorUsername
    WHERE b.id IS NULL;
  `;
  }
  // async noBlogs2() {
  //   return this.prisma.user.findMany({
  //     where: {
  //       blogs: {
  //         none: {}, //zero blogs
  //       },
  //     },
  //     select: { username: true },
  //   });
  // }

  async usersBlogsNoNegative() {
    return this.prisma.$queryRaw`
    SELECT u.username
    FROM User u
    JOIN Blog b ON u.username = b.authorUsername
    LEFT JOIN Comment c ON b.id = c.blogId
    GROUP BY u.username
    HAVING COALESCE(SUM(c.sentiment = 'negative'), 0) = 0;
  `;
  }
  // async usersBlogsNoNegative2() {
  //   return this.prisma.user.findMany({
  //     where: {
  //       blogs: {
  //         some: {}, //must hv posted at least 1 blog
  //         every: {
  //           comments: {
  //             every: {
  //               OR: [
  //                 { sentiment: 'positive' },
  //                 { sentiment: null }, //no comments
  //               ],
  //             },
  //           },
  //         },
  //       },
  //     },
  //     select: { username: true },
  //   });
  // }

  async toggleFollow(follower: string, following: string) {
    if (follower === following) {
      throw new BadRequestException('You cannot follow yourself.');
    }

    //Make sure both users exist
    const userA = await this.prisma.user.findUnique({
      where: { username: follower },
    });
    const userB = await this.prisma.user.findUnique({
      where: { username: following },
    });
    if (!userA || !userB) {
      throw new NotFoundException('One or both users do not exist.');
    }

    //Check if following already
    const existing = await this.prisma.follow.findUnique({
      where: {
        follower_following: { follower, following },
      },
    });

    if (existing) {
      //Unfollow
      await this.prisma.follow.delete({
        where: {
          follower_following: { follower, following },
        },
      });
      return { isFollowing: false };
    }

    //Follow
    await this.prisma.follow.create({
      data: { follower, following },
    });
    return { isFollowing: true };
  }
}
