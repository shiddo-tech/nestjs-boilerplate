import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestApplication, NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { TrimStringsPipe } from './modules/common/transformer/trim-strings.pipe';
import { AppModule } from './modules/main/app.module';
import { setupSwagger } from './swagger';
import { PrismaExceptionFilter } from './adapter/prisma.exception.filter';

const logger: Logger = new Logger();

async function bootstrap(): Promise<void> {
  const app: NestApplication = await NestFactory.create(AppModule, {
    cors: true,
  });

  setupSwagger(app);
  app.enableCors();
  app.useGlobalPipes(new TrimStringsPipe(), new ValidationPipe());
  //const { httpAdapter } = app.get(HttpAdapterHost)
  //app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter))

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const port = 3000;

  await app.listen(port);

  logger.log(`NestJS initialized with port(s): ${port} (http)`);
}

bootstrap();
