import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '../config';
import { UserModule } from '../user';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { KeyCloakModule } from '../keycloak/keycloak.module';
import { HttpModule } from '@nestjs/axios';
import { KeyCloakAuthGuard } from './jwt-guard';


@Module({
  imports: [
    UserModule,
    ConfigModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    KeyCloakModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET_KEY'),
          signOptions: {
            ...(configService.get('JWT_EXPIRATION_TIME')
              ? {
                expiresIn: Number(configService.get('JWT_EXPIRATION_TIME')),
              }
              : {}),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, KeyCloakAuthGuard],
  exports: [
    AuthService,
    KeyCloakAuthGuard,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class AuthModule {
}
