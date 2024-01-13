import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Hash } from '../../utils/hash';
import { ConfigService } from '../config';
import { User, UsersService } from '../user';
import { LoginRequest } from './login.request';
import { LoginResponse, LoginResponseBuilder } from './login.response';
import { UnauthorizedException } from '../../errors/auth/unauthorized.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
  }

  async createToken(user: User): Promise<LoginResponse> {
    return new LoginResponseBuilder()
      .withExpiresIn(this.configService.get('JWT_EXPIRATION_TIME'))
      .withAccessToken(this.jwtService.sign({ id: user.id }))
      .withUser(user)
      .build();
  }

  async validateUser(payload: LoginRequest): Promise<User> {
    const user = await this.userService.getByEmail(payload.email);
    if (!user || !Hash.compare(payload.password, user.password)) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
