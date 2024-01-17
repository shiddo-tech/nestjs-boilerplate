import { Global, Module } from '@nestjs/common';
import { KeycloakConfigService } from './keycloak.service';
import { ConfigModule } from '../config';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [KeycloakConfigService],
  exports: [KeycloakConfigService],
})
export class KeyCloakModule {
}