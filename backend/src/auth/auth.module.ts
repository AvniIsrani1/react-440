import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secretkey123456789',
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, UserService],
  exports: [AuthService],
})
export class AuthModule {}
