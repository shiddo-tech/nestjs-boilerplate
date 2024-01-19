import { PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';


export class KeycloakDto {
  auth_server_url: string;
  realm: string;
  client_id: string;
  client_secret: string;
  username: string;
  grant_type: string;
  token: string;
  password: string;
  policyEnforcement: PolicyEnforcementMode;
  tokenValidation: TokenValidation;

  public constructor(builder: KeycloakDtoBuilder) {
    this.auth_server_url = builder.auth_server_url;
    this.realm = builder.realm;
    this.client_id = builder.client_id;
    this.username = builder.username;
    this.password = builder.password;
    this.grant_type = builder.grant_type;
    this.token = builder.token;
    this.client_secret = builder.client_secret;
    this.policyEnforcement = builder.policyEnforcement || PolicyEnforcementMode.PERMISSIVE;
    this.tokenValidation = builder.tokenValidation || TokenValidation.ONLINE;
  }

  static builder(): KeycloakDtoBuilder {
    return new KeycloakDtoBuilder();
  }
}

export class KeycloakDtoBuilder {
  auth_server_url: string;
  realm: string;
  client_id: string;
  client_secret: string;
  username: string;
  grant_type: string;
  token: string;
  password: string;
  policyEnforcement: PolicyEnforcementMode;
  tokenValidation: TokenValidation;

  withAuthServerUrl(authServerUrl: string): KeycloakDtoBuilder {
    this.auth_server_url = authServerUrl;
    return this;
  }

  withRealm(realm: string): KeycloakDtoBuilder {
    this.realm = realm;
    return this;
  }

  withClientId(clientId: string): KeycloakDtoBuilder {
    this.client_id = clientId;
    return this;
  }

  withClientSecret(secret: string): KeycloakDtoBuilder {
    this.client_secret = secret;
    return this;
  }

  withPolicyEnforcement(policyEnforcement: PolicyEnforcementMode): KeycloakDtoBuilder {
    this.policyEnforcement = policyEnforcement;
    return this;
  }

  withTokenValidation(tokenValidation: TokenValidation): KeycloakDtoBuilder {
    this.tokenValidation = tokenValidation;
    return this;
  }

  withUsername(username: string): KeycloakDtoBuilder {
    this.username = username;
    return this;
  }

  withPassword(password: string): KeycloakDtoBuilder {
    this.password = password;
    return this;
  }

  withToken(token: string): KeycloakDtoBuilder {
    this.token = token;
    return this;
  }

  withGrantType(grantType: string): KeycloakDtoBuilder {
    this.grant_type = grantType;
    return this;
  }

  build(): KeycloakDto {
    return new KeycloakDto(this);
  }
}