import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async create(createBlogDto: CreateBlogDto, authorUsername: string) {
    const today = new Date();
    const count = await this.prisma.blog.count({
      where: {
        authorUsername,
        createdAt: {
          gte: new Date(today.setHours(0, 0, 0, 0)),
          lte: new Date(today.setHours(23, 59, 59, 999)),
        },
      },
    });
    if (count >= 2) throw new BadRequestException('Max 2 blogs per day.');

    //Normalize tags before saving
    const tagArray = createBlogDto.tags
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .join(',');

    return this.prisma.blog.create({
      data: {
        ...createBlogDto,
        tags: tagArray, //override with normalized string
        authorUsername,
      },
    });
  }

  async findAllBlogs() {
    return this.prisma.blog.findMany({
      include: {
        comments: {
          select: {
            id: true,
            sentiment: true,
            content: true,
            createdAt: true,
            authorUsername: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async searchByTag(tag: string) {
    if (!tag || !tag.trim()) {
      console.log('Tag empty, returning all blogs');
      return this.findAllBlogs(); //return all blogs if tag empty
    }
    const normalizedTag = tag.trim().toLowerCase();
    console.log('Searching for tag:', normalizedTag); //for debug
    const blogs = await this.prisma.blog.findMany({
      include: {
        comments: {
          select: {
            id: true,
            sentiment: true,
            content: true,
            createdAt: true,
            authorUsername: true,
          },
        },
      },
    });
    // Return only those that have the EXACT tag
    return blogs.filter((blog) => {
      const tagsList = blog.tags.split(',').map((t) => t.trim().toLowerCase());
      return tagsList.includes(normalizedTag);
    });
  }

  async findUsersWithTagsXandY(tagX: string, tagY: string) {
    const x = tagX.trim().toLowerCase();
    const y = tagY.trim().toLowerCase();
    return this.prisma.$queryRaw`
    SELECT DISTINCT b1.authorUsername
    FROM Blog b1
    JOIN Blog b2
      ON b1.authorUsername = b2.authorUsername
     AND DATE(b1.createdAt) = DATE(b2.createdAt)
     AND b1.id <> b2.id
    WHERE FIND_IN_SET(${x}, b1.tags)
      AND FIND_IN_SET(${y}, b2.tags);
    `;
  }

  //date must be entered as: YYYY-MM-DD
  async mostBlogsOnDate(date: string) {
    const rows = await this.prisma.$queryRaw<
      { authorUsername: string; num: any }[]
    >`
    WITH counts AS (
      SELECT authorUsername, CAST(COUNT(*) AS SIGNED) AS num
      FROM Blog
      WHERE DATE(createdAt) = ${date}
      GROUP BY authorUsername
    ),
    maxCount AS (
      SELECT CAST(MAX(num) AS SIGNED) AS maxNum 
      FROM counts
    )
    SELECT authorUsername, num
    FROM counts, maxCount
    WHERE counts.num = maxCount.maxNum;
  `;
    return rows.map((row) => ({
      authorUsername: row.authorUsername,
      num: Number(row.num),
    }));
  }

  async positiveOnlyBlogs(username: string) {
    return this.prisma.$queryRaw`
    SELECT b.id, b.subject, b.description
    FROM Blog b
    JOIN Comment c ON b.id = c.blogId 
    WHERE b.authorUsername = ${username}
    GROUP BY b.id
    HAVING SUM(c.sentiment = 'negative') = 0
       AND COUNT(*) > 0;
  `;
  }
  // async positiveOnlyBlogs2(username: string) {
  //   return this.prisma.blog.findMany({
  //     where: {
  //       authorUsername: username,
  //       comments: {
  //         some: {}, //at least one comment
  //         every: {
  //           sentiment: 'positive',
  //         },
  //       },
  //     },
  //     select: { id: true, subject: true, description: true },
  //   });
  // }
}
