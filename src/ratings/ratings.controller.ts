import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseEnumPipe,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingPeriod } from './types/rating-period';
import { NewRatingDto } from './dto/new-rating.dto';
import { ObjectId } from 'mongodb';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get(':period')
  async getAll(
      @Param('period', new ParseEnumPipe(RatingPeriod)) period: RatingPeriod
  ) {
    return await this.ratingsService.getAll(period);
  }

  @Post('save')
  async save(@Body() newRatingDto: NewRatingDto) {
    if (!ObjectId.isValid(newRatingDto.userId)) {
      throw new BadRequestException('Invalid user id');
    }
    if (newRatingDto.score < 0) {
      throw new BadRequestException('Score cannot be negative');
    }
    return await this.ratingsService.saveNewRating(newRatingDto);
  }
}