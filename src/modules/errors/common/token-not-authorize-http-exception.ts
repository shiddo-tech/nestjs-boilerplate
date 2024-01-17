import { HttpStatus } from '@nestjs/common';
import { Errors } from '../domain/errors.enum';
import { ApiRuntimeException } from '../api-runtime-exception';
import { ApiErrorDTO } from '../domain/api-error.dto';

export class TokenNotAuthorizeHttpException extends ApiRuntimeException {

  constructor() {
    const response = ApiErrorDTO.builder()
      .code(Errors.AUTH000)
      .description('Token not authorized')
      .build();
    super(response, HttpStatus.FORBIDDEN);
  }

}
