import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UnauthorizedError } from '../../errors/unauthorized.error';

@Injectable()
export class KeyCloakAuthGuard extends AuthGuard('jwt') {
  private logger = new Logger(KeyCloakAuthGuard.name);

  constructor(
    private readonly authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if(context.getHandler().name === 'login') {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    if (!req.headers?.authorization) {
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

    const x = await this.authService.validateAccessToken(authorization.replace(/^Bearer\s/, ''));

    return x;
  }


}
