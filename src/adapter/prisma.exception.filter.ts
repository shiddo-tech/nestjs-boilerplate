import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch } from '@nestjs/common';

@Catch()
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    //const status = this.getStatus(exception);

    response.status(200).json({
      statusCode: 200,
      message: exception.message,
      code: exception.code, // Include Prisma error code if available
      meta: exception.meta, // Include additional metadata if available
    });

  }
}