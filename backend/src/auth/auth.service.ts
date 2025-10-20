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
    if (await this.userExists(data.username, data.email, data.phone)) {
      throw new BadRequestException(
        'User with provided details already exists',
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
      throw new NotFoundException('Account does not exist');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
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
  ): Promise<boolean> {
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }, { phone }],
      },
    });
    return !!existing;
  }
}
