import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorDTO } from '../domain/api-error.dto';
import { Errors } from '../domain/errors.enum';
import { ApiRuntimeException } from '../api-runtime-exception';

export class HttpExceptionUtil {

  public static buildHttpException(err: any,
                                   code: Errors,
                                   description?: string,
                                   details?: Record<string, any>): ApiRuntimeException {
    if (err instanceof ApiRuntimeException) {
      return err;
    }
    const data = err?.response?.data;

    let response: ApiErrorDTO;

    if (data?.code && data?.description && data?.origin_system) {
      response = ApiErrorDTO.builder()
        .code(data.code)
        .description(data.description)
        .details(data.details || details)
        .build();
    } else if (err?.response?.code) {
      response = ApiErrorDTO.builder()
        .code(err.response.code)
        .description(err.response.description || err.message)
        .details(details?.error || err.response.details || err.response)
        .build();
    } else if (err?.message?.indexOf('timeout') > -1) {
      response = ApiErrorDTO.builder()
        .code(Errors.GEN000)
        .description('timeout')
        .details(details || data)
        .build();
    } else if (err?.code === 'ECONNREFUSED' || err?.response?.status == HttpStatus.SERVICE_UNAVAILABLE) {
      response = ApiErrorDTO.builder()
        .code(code)
        .description('Serviço temporariamente indisponível. Tente novamente mais tarde.')
        .build();
    } else {
      response = ApiErrorDTO.builder()
        .code(code)
        .description(description || err.message)
        .details(details || data)
        .build();
    }

    return new ApiRuntimeException(response, this.makeStatus(err));
  }

  private static makeStatus(err) {
    if (err?.response?.status) {
      return err?.response?.status;
    }
    if (err?.code === 'ECONNREFUSED' || err?.code === 'ECONNRESET') {
      return HttpStatus.SERVICE_UNAVAILABLE;
    }
    if (err?.code === 'ECONNABORTED' || err?.code === 'ETIMEDOUT' || err?.code === 'ETIME') {
      return HttpStatus.GATEWAY_TIMEOUT;
    }
    return HttpStatus.BAD_REQUEST;
  }
}
