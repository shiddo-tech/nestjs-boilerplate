import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_AUTH = 'isAuth';
export const IsAuth = (): CustomDecorator =>
  SetMetadata(IS_AUTH, true);
