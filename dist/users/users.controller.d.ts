import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
