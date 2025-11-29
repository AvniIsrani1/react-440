import { CommentDto } from './dto/comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async createComment(
    blogId: number,
    commentDto: CommentDto,
    authorUsername: string,
  ) {
    //Prevent self-review
    const blog = await this.prisma.blog.findUnique({ where: { id: blogId } });
    if (!blog) throw new BadRequestException('Blog not found.');
    if (blog.authorUsername === authorUsername)
      throw new BadRequestException('You cannot comment on your own blog.');

    //Prevent multiple comments on same blog
    const existing = await this.prisma.comment.findFirst({
      where: { blogId, authorUsername },
    });
    if (existing)
      throw new BadRequestException('You already commented on this blog.');

    //Limit 3 comments/day
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const commentCount = await this.prisma.comment.count({
      where: {
        authorUsername,
        createdAt: { gte: startOfDay, lte: endOfDay },
      },
    });

    if (commentCount >= 3)
      throw new BadRequestException(
        'You can only post up to 3 comments per day.',
      );

    //Create comment
    return this.prisma.comment.create({
      data: {
        sentiment: commentDto.sentiment,
        content: commentDto.content,
        blogId,
        authorUsername,
      },
    });
  }

  async getCommentsForBlog(blogId: number) {
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
      include: {
        comments: {
          include: {
            author: {
              select: {
                username: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return blog.comments.map((comment) => ({
      id: comment.id,
      sentiment: comment.sentiment,
      content: comment.content,
      createdAt: comment.createdAt,
      author: comment.author.username,
    }));
  }

  async usersAllNegativeComments() {
    return this.prisma.$queryRaw`
      SELECT authorUsername AS username
      FROM Comment
      GROUP BY authorUsername
      HAVING COUNT(*) > 0
        AND SUM(sentiment = 'positive') = 0;
    `; //at least 1 comment AND all comments are not positive (i.e. negative)
  }
  // async usersAllNegativeComments2() {
  //   return this.prisma.user.findMany({
  //     where: {
  //       comments: {
  //         some: {}, //has comments
  //         every: {
  //           sentiment: 'negative',
  //         },
  //       },
  //     },
  //     select: { username: true },
  //   });
  // }
}
