import { Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DebugSingleton } from './debug.singleton';

;

export class DebugUtil {

  private static logger: Logger = new Logger(DebugUtil.name);

  static debugRequest(req: { method: any; url: any; hostname: any; headers: any; body: any; params: any; query: any; }): string | undefined {
    if (DebugSingleton.getInstance().getIsDebug()) {
      const uuid = randomUUID();
      this.logger.debug(`REQUEST ${uuid} to --> ${req.method} ${req.url} by host ${req.hostname}`);
      this.logger.debug(`REQUEST ${uuid} - headers by request \n${JSON.stringify(req?.headers, null, 2)}`);
      this.logger.debug(`REQUEST ${uuid} - body by request \n${JSON.stringify(req?.body, null, 2)}`);
      this.logger.debug(`REQUEST ${uuid} - params by request \n${JSON.stringify(req?.params, null, 2)}`);
      this.logger.debug(`REQUEST ${uuid} - query by request \n${JSON.stringify(req?.query, null, 2)}`);
      return uuid;
    }
    return undefined;
  }

  static debugResponse(res: any, uuid: string): void {
    if (DebugSingleton.getInstance().getIsDebug()) {
      this.logger.debug(`RESPONSE ${uuid} - body to response \n${JSON.stringify(res, null, 2)}`);
    }
  }


}
