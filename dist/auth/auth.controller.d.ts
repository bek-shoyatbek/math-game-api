import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
