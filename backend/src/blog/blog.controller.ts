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

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createBlog(@Body() createBlogDto: CreateBlogDto, @Req() req) {
    const authorUsername = req.user?.username; // extract from auth context
    if(!authorUsername) throw new BadRequestException("Author username is not present");
    return this.blogService.create(createBlogDto, String(authorUsername));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('search')
  async searchByTag(@Query('tag') tag: string) {
    console.log('Search route hit with tag:', tag);
    return this.blogService.searchByTag(tag);
  }
}
