import { Global, Module } from '@nestjs/common';
import { KeycloakService } from './keycloak.service';
import { ConfigModule, ConfigService } from '../config';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { KeycloakConnectModule, KeycloakConnectOptions } from 'nest-keycloak-connect';

@Global()
@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
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
          grant_type: config.get('KEYCLOAK_GRANT_TYPE'),
        } as KeycloakConnectOptions;
      },
    }),
  ],
  providers: [KeycloakService],
  exports: [KeycloakService, PassportModule.register({ defaultStrategy: 'jwt' }),],
})
export class KeyCloakModule {
}