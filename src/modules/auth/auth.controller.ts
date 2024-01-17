import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService, LoginRequest } from './';
import { CurrentUser } from '../common/decorator/current-user.decorator';
import { User } from '../user';
import { LoginResponse } from './login.response';
import { Public } from 'nest-keycloak-connect';
import { IsAuth } from './is.auth.decorator';

@Controller('auth')
@ApiTags('01 - Autenticação')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @IsAuth()
  @Public()
  @Post('/token')
  @ApiConsumes("application/x-www-form-urlencoded")
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
      return await this.authService.generateAccessToken(loginRequest);
  }

  @ApiBearerAuth()
  @Get('test')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInUser(): Promise<string> {
    return "your token is valid";
  }
}
