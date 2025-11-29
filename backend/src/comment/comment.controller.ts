import { CommentDto } from './dto/comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':blogId')
  async postComment(
    @Param('blogId') blogId: number,
    @Body() commentDto: CommentDto,
    @Req() req,
  ) {
    const username = req.user?.username; // extract from auth context
    return this.commentService.createComment(
      Number(blogId),
      commentDto,
      username,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all-negative-commenters')
  allNegative() {
    return this.commentService.usersAllNegativeComments();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getComments(@Param('id') blogId: number) {
    return this.commentService.getCommentsForBlog(Number(blogId));
  }
}
