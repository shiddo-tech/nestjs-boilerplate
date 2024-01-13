import { User } from '../user';

export class LoginResponse {
  constructor() {
  }

  expiresIn: string;
  accessToken: string;
  user: User;
}

export class LoginResponseBuilder {
  private readonly loginResponse: LoginResponse;

  constructor() {
    this.loginResponse = new LoginResponse();
  }

  withExpiresIn(expiresIn: string): LoginResponseBuilder {
    this.loginResponse.expiresIn = expiresIn;
    return this;
  }

  withAccessToken(accessToken: string): LoginResponseBuilder {
    this.loginResponse.accessToken = accessToken;
    return this;
  }

  withUser(user: User): LoginResponseBuilder {
    this.loginResponse.user = user;
    return this;
  }

  build(): LoginResponse {
    return this.loginResponse;
  }
}
