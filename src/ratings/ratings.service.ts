import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RatingPeriod } from './types/rating-period';
import { NewRatingDto } from './dto/new-rating.dto';

@Injectable()
export class RatingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(period: RatingPeriod) {
    const currentDate = new Date();
    let startDate: Date;
    let endDate: Date;

    switch (period) {
      case RatingPeriod.DAILY:
        startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
        );
        endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1
        );
        break;
      case RatingPeriod.WEEKLY:
        startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - currentDate.getDay()
        );
        endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - currentDate.getDay() + 7
        );
        break;
      case RatingPeriod.MONTHLY:
        startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        );
        endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            1
        );
        break;
      case RatingPeriod.ALL_TIME:
        startDate = new Date(0); // Earliest possible date
        endDate = new Date(); // Current date
        break;
      default:
        throw new BadRequestException('Invalid rating period');
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

    // Use map with index to assign rankings
    return ratings.map((rating, index) => ({
      ...rating,
      user: {
        ...rating.user,
        ranking: index + 1,
      },
    }));
  }

  async saveNewRating(newRatingDto: NewRatingDto) {
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
}