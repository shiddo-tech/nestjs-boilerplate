import { HttpStatus, Injectable, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ApiErrorDTO } from '../errors/domain/api-error.dto';
import { Errors } from '../errors/domain/errors.enum';
import { ApiRuntimeException } from '../errors/api-runtime-exception';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  createExceptionFactory() {
    return (validationErrors?: ValidationError[]) => {
      const errorMessages = validationErrors.reduce((accumulator, error) => {
        const { property, constraints } = error;
        const errorMessages = Object.values(constraints);
        accumulator[property] = errorMessages.join(', ');
        return accumulator;
      }, {});
      const apiErrorDTO = ApiErrorDTO.builder()
        .code(Errors.GEN000)
        .description('Um ou mais campos estão inválidos')
        .details(errorMessages)
        .build();
      return new ApiRuntimeException(apiErrorDTO, HttpStatus.BAD_REQUEST);
    };
  }
}
