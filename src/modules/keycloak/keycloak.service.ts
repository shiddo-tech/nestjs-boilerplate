import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { KeycloakDto } from './keycloak.dto';
import { catchError, map } from 'rxjs/operators';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KeycloakConfigService {

  private readonly logger = new Logger(KeycloakConfigService.name);

  constructor(
    private readonly http: HttpService,
  ) {
  }

  async introspect(keyCloakDto: KeycloakDto): Promise<boolean> {
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