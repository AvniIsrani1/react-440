import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { PrismaModule } from '../prisma/prisma.module'; // ✅ Import this

@Module({
  imports: [PrismaModule], // ✅ Add this
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}