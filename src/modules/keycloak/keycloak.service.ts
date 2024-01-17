import { Injectable } from '@nestjs/common';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';
import { KeycloakDto } from './keycloak.dto';
import { ConfigService } from '../config';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {

  constructor(
    private readonly configService: ConfigService,
  ) {
  }

  createKeycloakConnectOptions(): Promise<KeycloakConnectOptions> | KeycloakConnectOptions {
    return undefined;
  }


}