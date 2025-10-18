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

    async create(data: SignupDto){
        if(data.password!== data.confirmPassword){
            throw new BadRequestException("Passwords do not match");
        }
        const { confirmPassword, ...info} = data;
        const hashedPassword = await bcrypt.hash(info.password, 10);
        return await this.prisma.user.create({
            data: {
                ...info, 
                password: hashedPassword
            },
        });
    }

    async findByUsername(username: string){
        return await this.prisma.user.findUnique({where: {username}});
    }

    async validateCredentials(username: string, password: string){
        const user = await this.findByUsername(username);
        if(!user){
            throw new NotFoundException('User not found');
        }
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
            throw new UnauthorizedException("Invalid password");
        }
        const {password: _, ...safeUser} = user;
        return safeUser;
    }

    async userExists(username: string, email: string, phone: string): Promise<boolean> {
        const existing = await this.prisma.user.findFirst({
            where: { 
                OR: [{username}, {email}, {phone}]
            }
        });
        return !!existing;
    }
}
