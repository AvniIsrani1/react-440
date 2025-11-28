import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FollowingModule } from '../following/following.module';//import

@Module({
  imports: [PrismaModule, FollowingModule],//add FollowingModule here
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}