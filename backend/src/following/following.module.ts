import { Module } from '@nestjs/common';
import { FollowingController } from './following.controller';
import { FollowingService } from './following.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FollowingController],
  providers: [FollowingService],
  exports: [FollowingService], //make FollowingService available to other modules
})
export class FollowingModule {}