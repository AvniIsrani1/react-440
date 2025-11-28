import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionsFilter } from './prisma/prisma-exceptions-filter';
import { ValidationPipe } from '@nestjs/common';
import { ensureDatabaseExists } from './bootstrap';//KV added

async function bootstrap() {
  await ensureDatabaseExists();//make sure the database exists //KV added

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new PrismaExceptionsFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();