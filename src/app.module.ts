import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {RatingsModule} from './ratings/ratings.module';
import {HttpLoggerMiddleware} from "./middlewares/http-logger.middleware";

@Module({
    imports: [AuthModule, UsersModule, RatingsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(HttpLoggerMiddleware)
            .forRoutes('*');
    }
}
