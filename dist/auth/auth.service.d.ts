import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class AuthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    login(loginDto: Prisma.UserCreateInput): Promise<{
        id: string;
        username: string;
        email: string;
        avatar: string;
        rating: number;
        coins: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
