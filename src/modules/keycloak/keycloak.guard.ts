import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { KeycloakService } from './keycloak.service';
import { KeycloakDto } from './keycloak.dto';
import { PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';
import { ConfigService } from '../config';

@Injectable()
export class KeyCloakGuard extends AuthGuard('jwt') {
  private logger = new Logger(KeyCloakGuard.name);

  constructor(
    private readonly service: KeycloakService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (!context || !context.switchToHttp() || !context.switchToHttp().getRequest()) {
      this.logger.error('fail to validate request data validation');
      return false;
    }
    const req = context.switchToHttp().getRequest();
    if (!req?.headers?.authorization) {
      this.logger.error('authorization header is required');

      throw new UnauthorizedError
      ('\u00e9 obrigat\u00f3rio informar o atributo authorization no header da requisi\u00e7\u00e3o');
    }

    const authorization: string = req.headers.authorization;

    if (!authorization?.toUpperCase()?.includes('BEARER ')) {
      this.logger.error(`bearer auth header is required, host request ${req.headers?.host}`);
      throw new
      UnauthorizedError(
        '\u00e9 obrigat\u00f3rio informar o atributo bearer auth no header da requisi\u00e7\u00e3o');
    }

    const token = authorization.replace(/^Bearer\s/, '');

    return await this.service.introspect(this.getKeyCloakDto(token));
  }


  private getKeyCloakDto(token: string = undefined) {
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
