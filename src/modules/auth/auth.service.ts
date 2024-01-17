import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '../config';
import { LoginRequest } from './login.request';
import { LoginResponse } from './login.response';
import { KeycloakConfigService } from '../keycloak/keycloak.service';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { KeycloakDto } from '../keycloak/keycloak.dto';
import { PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly http: HttpService,
    private readonly keycloakService: KeycloakConfigService,
    private readonly configService: ConfigService,
  ) {
  }

  async generateAccessToken(login: LoginRequest): Promise<LoginResponse> {
    const keyCloakDto = KeycloakDto.builder()
      .withAuthServerUrl(this.configService.get('KEYCLOAK_AUTH_SERVER_URL'))
      .withRealm(this.configService.get('KEYCLOAK_REALM'))
      .withClientId(login.client_id)
      .withClientSecret(login.client_secret)
      .withUsername(login.username)
      .withPassword(login.password)
      .withGrantType(login.grant_type)
      .withPolicyEnforcement(PolicyEnforcementMode.PERMISSIVE)
      .withTokenValidation(TokenValidation.ONLINE)
      .build();

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const formData: URLSearchParams = new URLSearchParams();
    for (const key in keyCloakDto) {
      formData.append(key, keyCloakDto[key]);
    }

    const keycloakObservable = this.http
      .post(keyCloakDto.auth_server_url + 'realms/dev/protocol/openid-connect/token', formData, { headers })
      .pipe(
        map((res) => {
          return res.data;
        }),
      ).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'an error occur when trying to find a user';
        }),
      );

    return await firstValueFrom(keycloakObservable);
  }

  async validateAccessToken(accessToken: string): Promise<boolean> {

    const keyCloakDto = KeycloakDto.builder()
      .withAuthServerUrl(this.configService.get('KEYCLOAK_AUTH_SERVER_URL'))
      .withRealm(this.configService.get('KEYCLOAK_REALM'))
      .withClientId('client_id_test')
      .withClientSecret('cQdzMpNLIeunSHMGc147n0QkXyL97tSU')
      .withToken(accessToken)
      .withUsername('user_1')
      .withPolicyEnforcement(PolicyEnforcementMode.PERMISSIVE)
      .withTokenValidation(TokenValidation.ONLINE)
      .build();

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const formData: URLSearchParams = new URLSearchParams();
    for (const key in keyCloakDto) {
      formData.append(key, keyCloakDto[key]);
    }
    const keycloakObservable = this.http
      .post(keyCloakDto.auth_server_url + 'realms/dev/protocol/openid-connect/token/introspect', formData, { headers })
      .pipe(
        map((res) => {
          return res?.data?.active;
        }),
      ).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'an error occur when trying to find a user';
        }),
      );

    return await firstValueFrom(keycloakObservable);
  }
}
