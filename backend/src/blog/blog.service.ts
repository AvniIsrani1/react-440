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
      .map(t => t.trim().toLowerCase())
      .join(',');

    return this.prisma.blog.create({
      data: {
        ...createBlogDto,
        tags: tagArray, //override with normalized string
        authorUsername,
      },
    });
  }
  
  async searchByTag(tag: string) {
    const normalizedTag = tag.trim().toLowerCase();
    console.log('Searching for tag:', normalizedTag);//for debug
    return this.prisma.blog.findMany({
      where: {
        tags: {
          contains: normalizedTag,
        },
      },
    });
  }
}