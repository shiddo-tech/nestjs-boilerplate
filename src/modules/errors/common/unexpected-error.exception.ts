import { ApiRuntimeException } from '../api-runtime-exception';
import { Errors } from '../domain/errors.enum';
import { HttpStatus } from '@nestjs/common';
import { ApiErrorDTO } from '../domain/api-error.dto';

export class UnexpectedErrorException extends ApiRuntimeException {

  constructor(where: string = "undefined") {
    const response = ApiErrorDTO.builder()
      .code(Errors.GEN001)
      .description(`un unexpected error occurred during the system process: ${where}`)
      .build();
    super(response, HttpStatus.REQUEST_TIMEOUT);
  }
}
