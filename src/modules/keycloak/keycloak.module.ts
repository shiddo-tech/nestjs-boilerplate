import { Global, Module } from '@nestjs/common';
import { KeycloakConfigService } from './keycloak.service';
import { ConfigModule } from '../config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [KeycloakConfigService],
  exports: [KeycloakConfigService],
})
export class KeyCloakModule {
}