import { HttpStatus } from '@nestjs/common';
import { Errors } from './domain/errors.enum';
import { ApiRuntimeException } from './api-runtime-exception';
import { ApiErrorDTO } from './domain/api-error.dto';

export class UnauthorizedError extends ApiRuntimeException {

  constructor(details: string) {
    const response = ApiErrorDTO.builder()
      .code(Errors.AUTH000)
      .description(`Erro de autoriza\u00e7\u00e3o: ${details}`)
      .build();
    super(response, HttpStatus.UNAUTHORIZED);
  }

}
