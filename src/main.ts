import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get<ConfigService>(ConfigService);

    const appPort = configService.get<number>("PORT") ?? 4000;

    app.enableCors({
        origin: '*',
    });


    console.log("Application is running on port: ", appPort); 
    await app.listen(appPort);
}

bootstrap();
