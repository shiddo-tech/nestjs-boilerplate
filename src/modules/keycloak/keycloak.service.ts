import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { KeycloakDto } from './keycloak.dto';
import { catchError, map } from 'rxjs/operators';
import { firstValueFrom, throwError } from 'rxjs';
import { UnauthorizedException } from '../errors/auth/unauthorized.exception';

@Injectable()
export class KeycloakService {

  private readonly logger = new Logger(KeycloakService.name);

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
        catchError(err => {
          this.logger.error(err.response.data);
          return throwError(() => new UnauthorizedException());
        }),
      );

    return await firstValueFrom(keycloakObservable);
  }

}