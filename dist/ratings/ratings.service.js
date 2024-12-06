"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const rating_period_1 = require("./types/rating-period");
let RatingsService = class RatingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll(period) {
        const currentDate = new Date();
        let startDate;
        let endDate;
        switch (period) {
            case rating_period_1.RatingPeriod.DAILY:
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
                endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
                break;
            case rating_period_1.RatingPeriod.WEEKLY:
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
                endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 7);
                break;
            case rating_period_1.RatingPeriod.MONTHLY:
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
                break;
            default:
                throw new common_1.BadRequestException('Invalid rating period');
        }
        const ratings = await this.prisma.rating.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lt: endDate,
                },
            },
            include: {
                user: true,
            },
            orderBy: {
                score: 'desc',
            },
        });
        ratings?.map((rating, index) => {
            rating.user.rating = index + 1;
            return rating;
        });
        return ratings;
    }
    async saveNewRating(newRatingDto) {
        const rating = await this.prisma.rating.create({
            data: {
                score: newRatingDto.score,
                userId: newRatingDto.userId,
            },
        });
        await this.prisma.user.update({
            where: { id: newRatingDto.userId },
            data: {
                coins: { increment: newRatingDto.score },
            },
        });
        return rating;
    }
};
exports.RatingsService = RatingsService;
exports.RatingsService = RatingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RatingsService);
//# sourceMappingURL=ratings.service.js.map