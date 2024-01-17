import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TestResponse } from './test.response';
import { TestService } from './test.service';

@Controller('test')
@ApiTags('01 - Test de API')
export class TestController {
  constructor(
    private readonly testService: TestService,
  ) {
  }

  @Get('/')
  @ApiResponse({ status: 200, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async test(): Promise<TestResponse> {
    return await this.testService.test();
  }

}
