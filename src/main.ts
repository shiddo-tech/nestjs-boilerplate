import { Logger, ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { TrimStringsPipe } from './modules/common/transformer/trim-strings.pipe';
import { AppModule } from './modules/main/app.module';
import { setupSwagger } from './swagger';
import { ConfigModule, ConfigService } from './modules/config';

const logger: Logger = new Logger();

async function bootstrap(): Promise<void> {
  const app: NestApplication = await NestFactory.create(AppModule, {
    cors: true,
  });

  setupSwagger(app);
  app.enableCors();
  app.useGlobalPipes(new TrimStringsPipe(), new ValidationPipe());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = app.select(ConfigModule).get(ConfigService);

  const port = config.get("APP_PORT")

  await app.listen(port);

  logger.log(`NestJS initialized with port(s): ${port} (http)`);
}

bootstrap().catch((error) => logger.log(error));
