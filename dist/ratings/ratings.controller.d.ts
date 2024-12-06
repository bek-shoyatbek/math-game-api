import { RatingsService } from './ratings.service';
import { RatingPeriod } from './types/rating-period';
import { NewRatingDto } from './dto/new-rating.dto';
export declare class RatingsController {
    private readonly ratingsService;
    constructor(ratingsService: RatingsService);
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
    save(newRatingDto: NewRatingDto): Promise<{
        id: string;
        userId: string;
        score: number;
        createdAt: Date;
    }>;
}
