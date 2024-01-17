import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../../config';
import { KeycloakConfigService } from '../../keycloak/keycloak.service';
import { KeycloakDto } from '../../keycloak/keycloak.dto';
import { PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';
import { LoginRequest } from '../login.request';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly keycloakService: KeycloakConfigService,
    private readonly configService: ConfigService,
  ) {
  }

  async validateAccessToken(accessToken: string): Promise<boolean> {

    const loginData = LoginRequest.builder()
      .withClientId(this.configService.get('KEYCLOAK_CLIENT_ID'))
      .withClientSecret(this.configService.get('KEYCLOAK_CLIENT_SECRET'))
      .build();

    const keyCloakDto = this.getKeyCloakDto(loginData, accessToken);

    return await this.keycloakService.introspect(keyCloakDto);
  }

  private getKeyCloakDto(login: LoginRequest, token: string = undefined) {
    return KeycloakDto.builder()
      .withAuthServerUrl(this.configService.get('KEYCLOAK_AUTH_SERVER_URL'))
      .withRealm(this.configService.get('KEYCLOAK_REALM'))
      .withClientId(this.configService.get('KEYCLOAK_CLIENT_ID'))
      .withClientSecret(this.configService.get('KEYCLOAK_CLIENT_SECRET'))
      .withGrantType(this.configService.get('KEYCLOAK_GRANT_TYPE'))
      .withToken(token)
      .withPolicyEnforcement(PolicyEnforcementMode.PERMISSIVE)
      .withTokenValidation(TokenValidation.ONLINE)
      .build();
  }
}