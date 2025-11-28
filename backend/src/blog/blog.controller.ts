import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PrismaService } from '../prisma/prisma.service';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly prisma: PrismaService,
  ) {}

  //Protected: only logged-in users can create blogs
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createBlog(@Body() createBlogDto: CreateBlogDto, @Req() req) {
    const authorUsername = req.user?.username; // extract from JWT payload
    if(!authorUsername)
      throw new BadRequestException('Author username is not present');
    return this.blogService.create(createBlogDto, String(authorUsername));
  }

  //Public: anyone can search blogs by tag
  @Get('search')
  async searchByTag(@Query('tag') tag: string) {
    console.log('Search route hit with tag:', tag); // debug
    return this.blogService.searchByTag(tag);
  }

  //Public: Phase 3 Step #1
  @Get('p3s1')
  async searchByTags(
    @Query('tag1') tag1: string,
    @Query('tag2') tag2: string,
  ) {
    console.log('Step 1 route hit with tags:', tag1, 'and', tag2);
    try{
      const result = await this.prisma.$queryRawUnsafe(`
        SELECT b1.authorUsername AS username,
               b1.id AS blog1Id, b1.subject AS blog1Subject, b1.description AS blog1Description, b1.tags AS blog1Tags, b1.createdAt AS blog1CreatedAt,
               b2.id AS blog2Id, b2.subject AS blog2Subject, b2.description AS blog2Description, b2.tags AS blog2Tags, b2.createdAt AS blog2CreatedAt
        FROM Blog b1
        JOIN Blog b2 
          ON b1.authorUsername = b2.authorUsername
          AND DATE(b1.createdAt) = DATE(b2.createdAt)
        WHERE LOWER(b1.tags) LIKE '%${tag1.toLowerCase()}%' 
          AND LOWER(b2.tags) LIKE '%${tag2.toLowerCase()}%';
      `);
      console.log('result = ', result);
      return result;
    }
    catch (err){
      console.error('Query failed:', err);
      throw err;
    }
  }

  //Public: Phase 3 Step #2
  @Get('p3s2')
  async phase3step2(){
    console.log('Phase 3 Step #2 route hit');
    try{
      //NOTE: The query below returns the users with the most blogs yesterday. If you want to
      //      change it to today for testing, just comment out both instances of the "- INTERVAL 1
      //      DAY" code.
      const rawResult: any[] = await this.prisma.$queryRawUnsafe(`
        SELECT authorUsername, COUNT(*) AS blogCount
        FROM Blog
        WHERE DATE(CONVERT_TZ(createdAt, '+00:00', '-08:00')) = CURDATE() - INTERVAL 1 DAY
        GROUP BY authorUsername
        HAVING COUNT(*) = (
          SELECT MAX(userCount) 
          FROM (
            SELECT COUNT(*) AS userCount
            FROM Blog
            WHERE DATE(CONVERT_TZ(createdAt, '+00:00', '-08:00')) = CURDATE() - INTERVAL 1 DAY
            GROUP BY authorUsername
          ) AS counts
        );
      `);

      //Convert BigInt blogCount -> Number
      const result = rawResult.map((r) => ({
        authorUsername: r.authorUsername,
        blogCount: Number(r.blogCount),
      }));

      console.log('Step 2 result =', result);
      return result;
    }
    catch (err){
      console.error('Phase 3 Step #2 query failed:', err);
      throw err;
    }
  }
}