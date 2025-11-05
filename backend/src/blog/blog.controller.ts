/*import { Controller } from '@nestjs/common';

@Controller('blog')
export class BlogController {}*/

import { Controller, Get, Post, Body, Req, Query/*, UseGuards*/ } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async createBlog(@Body() createBlogDto: CreateBlogDto, @Req() req) {
    const authorUsername = req.body.authorUsername; // or extract from auth context if using guards
    return this.blogService.create(createBlogDto, authorUsername);
  }

  @Get('search')
  async searchByTag(@Query('tag') tag: string) {
    console.log('Search route hit with tag:', tag); //Debug log
    return this.blogService.searchByTag(tag);
  }

}

