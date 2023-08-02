import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { CorsConfig, NestConfig } from './common/configs/config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(3000);

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  );

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');

  // cors

  app.enableCors();

  await app.listen(process.env.PORT || nestConfig.port || 3000);
}
bootstrap();
