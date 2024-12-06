import { PrismaService } from 'src/prisma.service';
import { RatingPeriod } from './types/rating-period';
import { NewRatingDto } from './dto/new-rating.dto';
export declare class RatingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(period: RatingPeriod): Promise<({
        user: {
            id: string;
            username: string;
            email: string;
            avatar: string;
            rating: number;
            coins: number;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        userId: string;
        score: number;
        createdAt: Date;
    })[]>;
    saveNewRating(newRatingDto: NewRatingDto): Promise<{
        id: string;
        userId: string;
        score: number;
        createdAt: Date;
    }>;
}
