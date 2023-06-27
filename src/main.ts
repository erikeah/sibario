import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './shared/global-exception-filter';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new GlobalExceptionFilter());
    await app.listen(3000);
}
bootstrap();
