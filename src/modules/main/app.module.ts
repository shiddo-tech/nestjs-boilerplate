import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { CommonModule } from '../common';
import { ConfigModule, ConfigService } from '../config';
import { KeyCloakModule } from '../keycloak/keycloak.module';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpInterceptor } from '../../interceptor/http.interceptor';
import { CustomValidationPipe } from './custom-validation-pipe';
import { TestModule } from '../test/test.module';
import { KeyCloakGuard } from '../keycloak/keycloak.guard';

@Module({
  imports: [
    KeyCloakModule,
    TestModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + './../**/**.entity{.ts,.js}'],
          synchronize: configService.get('DB_SYNC') === 'true',
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule,
    CommonModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: KeyCloakGuard,
    },
  ],
})
export class AppModule {
}
