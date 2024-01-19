import { Injectable, Logger } from '@nestjs/common';
import { TestResponse } from './test.response';

@Injectable()
export class TestService {
  private readonly logger = new Logger(TestService.name);

  async test(): Promise<TestResponse> {
    this.logger.log('test in the api');
    return Promise.resolve(TestResponse.builder()
      .withSomeText('some text here')
      .build());
  }

}