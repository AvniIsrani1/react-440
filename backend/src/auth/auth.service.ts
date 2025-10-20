import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from 'src/common/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async create(data: SignupDto) {
    if (data.password !== data.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const existing = await this.userExists(data.username, data.email, data.phone);
    if (existing) {
      throw new BadRequestException(
        `A user with this ${existing} already exists.`,
      );
    }
    const { confirmPassword, ...info } = data;
    const hashedPassword = await bcrypt.hash(info.password, 10);
    return await this.prisma.user.create({
      data: {
        ...info,
        password: hashedPassword,
      },
    });
  }

  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      // throw new NotFoundException('Account does not exist');
      throw new UnauthorizedException('Invalid credentials');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password: _, ...payload } = user;
    const token = this.jwtService.sign(payload);
    return {
      accessToken: token,
      user: {
        username: user.username,
        email: user.email,
      },
    };
  }

  async userExists(
    username: string,
    email: string,
    phone: string,
  ): Promise<'username' | 'email' | 'phone' | null> {
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }, { phone }],
      },
    });
    if (!existing) return null;
    if (existing.username === username) return 'username';
    if (existing.email === email) return 'email';
    if (existing.phone === phone) return 'phone';
    return null;
  }
}
