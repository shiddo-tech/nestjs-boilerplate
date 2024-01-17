import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Errors } from './errors.enum';
import { TimeoutHttpException } from '../common/timeout-http.exception';

export class ApiErrorDTO {

  @ApiProperty({
    example: `${Errors.AUTH001}`,
    description: 'cod of the error',
  })
  @IsString()
  code: string;

  @ApiProperty({
    example: 'Client Unauthorized',
    description: 'description of the error',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: { 'client_id': 'header client_id is required' },
    description: 'details of the error',
  })
  @IsString()
  details: Record<string, any>;

  public static from(error: any): ApiErrorDTO {
    let apiError;
    if (error instanceof ApiErrorDTO) {
      apiError = error;
    } else if (error?.response instanceof ApiErrorDTO) {
      apiError = error?.response;
    } else if (error?.response?.data) {
      apiError = error?.response?.data;
    } else if (!error?.response) {
      apiError = new TimeoutHttpException();
    } else {
      apiError = error?.response;
    }
    return apiError;
  }

  public static builder(): ApiErrorDTOBuilder {
    return new ApiErrorDTOBuilder();
  }
}

export class ApiErrorDTOBuilder {
  apiErrorDTO: ApiErrorDTO = new ApiErrorDTO();

  public code(code: string): ApiErrorDTOBuilder {
    this.apiErrorDTO.code = code;
    return this;
  }

  public description(description: string): ApiErrorDTOBuilder {
    this.apiErrorDTO.description = description;
    return this;
  }

  public details(details: Record<string, any>): ApiErrorDTOBuilder {
    this.apiErrorDTO.details = details;
    return this;
  }

  public build(): ApiErrorDTO {
    return this.apiErrorDTO;
  }
}
