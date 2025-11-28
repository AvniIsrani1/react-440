import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BlogModule } from './blog/blog.module';
import { CommentModule } from './comment/comment.module';
import { FollowingModule } from './following/following.module';//KV add: for following implementation

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BlogModule,
    CommentModule,
    FollowingModule//KV add: for following implementation
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
