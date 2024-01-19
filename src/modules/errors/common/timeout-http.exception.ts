import { ApiRuntimeException } from '../api-runtime-exception';
import { Errors } from '../domain/errors.enum';
import { HttpStatus } from '@nestjs/common';
import { ApiErrorDTO } from '../domain/api-error.dto';

export class TimeoutHttpException extends ApiRuntimeException {

  constructor(message = 'timeout') {
    const response = ApiErrorDTO.builder()
      .code(Errors.GEN000)
      .description(message)
      .build();
    super(response, HttpStatus.REQUEST_TIMEOUT);
  }
}
