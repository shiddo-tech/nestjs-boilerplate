export class DebugSingleton {
  private static instance: DebugSingleton;

  private isDebug;

  private constructor() {
    this.isDebug = false;
  }

  public static getInstance(): DebugSingleton {
    if (!DebugSingleton.instance) {
      DebugSingleton.instance = new DebugSingleton();
    }

    return DebugSingleton.instance;
  }

  public setIsDebug(isDebug: boolean) {
    this.isDebug = isDebug;
  }

  public getIsDebug(): boolean {
    return this.isDebug;
  }
}
