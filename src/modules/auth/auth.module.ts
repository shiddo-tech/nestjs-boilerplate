import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '../config';
import { AuthService } from './service/auth.service';
import { KeyCloakModule } from '../keycloak/keycloak.module';
import { HttpModule } from '@nestjs/axios';
import { KeyCloakAuthGuard } from './guard/jwt-guard';
import { KeycloakConnectModule, KeycloakConnectOptions } from 'nest-keycloak-connect';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    KeyCloakModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          authServerUrl: config.get('KEYCLOAK_AUTH_SERVER_URL'),
          realm: config.get('KEYCLOAK_REALM'),
          clientId: config.get('KEYCLOAK_CLIENT_ID'),
          secret: config.get('KEYCLOAK_CLIENT_SECRET'),
        } as KeycloakConnectOptions;
      },
    }),
  ],
  controllers: [],
  providers: [AuthService, KeyCloakAuthGuard],
  exports: [
    AuthService,
    KeyCloakAuthGuard,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class AuthModule {
}
