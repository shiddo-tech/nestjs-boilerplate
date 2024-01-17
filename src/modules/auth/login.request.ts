import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @ApiProperty({
    required: true,
  })
  username: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: false,
  })
  client_id: string;

  @ApiProperty({
    required: false,
  })
  client_secret: string;

  @ApiProperty({
    required: false,
  })
  grant_type: string;

  constructor(builder: LoginRequestBuilder) {
    this.username = builder?.username;
    this.password = builder?.password;
    this.client_id = builder?.client_id;
    this.client_secret = builder?.client_secret;
    this.grant_type = builder?.grant_type;
  }

  static builder(): LoginRequestBuilder {
    return new LoginRequestBuilder();
  }
}

export class LoginRequestBuilder {
  username: string;
  password: string;
  client_id: string;
  client_secret: string;
  grant_type: string;


  withUsername(username: string): LoginRequestBuilder {
    this.username = username;
    return this;
  }

  withPassword(password: string): LoginRequestBuilder {
    this.password = password;
    return this;
  }

  withClientId(clientId: string): LoginRequestBuilder {
    this.client_id = clientId;
    return this;
  }

  withClientSecret(clientSecret: string): LoginRequestBuilder {
    this.client_secret = clientSecret;
    return this;
  }

  withGrantType(grantType: string): LoginRequestBuilder {
    this.grant_type = grantType;
    return this;
  }

  build(): LoginRequest {
    return this;
  }
}