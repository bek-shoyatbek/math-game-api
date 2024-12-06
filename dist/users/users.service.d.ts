import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUsers(order?: number, limit?: number): Promise<{
        id: string;
        username: string;
        email: string;
        avatar: string;
        rating: number;
        coins: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getUser(id: string): Promise<{
        id: string;
        username: string;
        email: string;
        avatar: string;
        rating: number;
        coins: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUser(id: string, updateUserDto: Prisma.UserUpdateInput): Promise<{
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
