import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionsFilter } from './prisma/prisma-exceptions-filter';
import { ValidationPipe } from '@nestjs/common';
import { ensureDatabaseExists } from './bootstrap';
import { execSync } from 'child_process';

async function bootstrap() {
  await ensureDatabaseExists(); //make sure the database exists

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

  //Run seed script
  console.log('Running seed script');
  execSync('npm run seed', { stdio: 'inherit' });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
