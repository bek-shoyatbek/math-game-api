import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [AuthModule, UsersModule, RatingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
