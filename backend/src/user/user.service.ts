import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from 'src/common/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async getAll(){ // return users without password
        const users = await this.prisma.user.findMany()
        return users.map(({password, ...info}) => info)
    }
}
