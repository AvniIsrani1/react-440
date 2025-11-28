import {CommentDto} from './dto/comment.dto';
import {AuthGuard} from '@nestjs/passport';
import {CommentService} from './comment.service';
import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  //Protected: only authenticated users can post comments
  @UseGuards(AuthGuard('jwt'))
  @Post(':blogId')
  async postComment(
    @Param('blogId') blogId: number,
    @Body() commentDto: CommentDto,
    @Req() req,
  ) {
    const username = req.user?.username; // extract from JWT payload
    return this.commentService.createComment(Number(blogId), commentDto, username);
  }

  //Public: anyone can view comments for a blog
  @Get(':id')
  async getComments(@Param('id') blogId: number) {
    return this.commentService.getCommentsForBlog(Number(blogId));
  }
}