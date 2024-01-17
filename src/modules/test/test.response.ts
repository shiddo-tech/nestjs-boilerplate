export class TestResponse {
  someText: string;

  constructor(builder: TestResponseBuilder) {
    this.someText = builder?.someText;
  }

  static builder(): TestResponseBuilder {
    return new TestResponseBuilder();
  }

}

export class TestResponseBuilder {
  someText: string;

  withSomeText(someText: string): TestResponseBuilder {
    this.someText = someText;
    return this;
  }

  build(): TestResponse {
    return new TestResponse(this);
  }
}
