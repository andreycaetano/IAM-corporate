import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';

import { User } from '@/users/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/is-public.decorator';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginValidationGuard } from './guards/login-validation.guard';
import { AuthGuard } from '@nestjs/passport';
import express from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import * as authRequestInterface from '@/auth/interfaces/auth-request.interface';
import {
  SwaggerAuthCheckToken,
  SwaggerAuthForgotPassword,
  SwaggerAuthLogin,
} from '@/auth/swagger/decorator.swagger';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @SwaggerAuthLogin()
  @UseGuards(LoginValidationGuard, LocalAuthGuard)
  @Post('login')
  login(@Request() req: authRequestInterface.AuthRequest) {
    return this.authService.login(req.user);
  }

  @Public()
  @SwaggerAuthForgotPassword()
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @ApiBearerAuth()
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @CurrentUser() user: User,
  ) {
    return this.authService.resetPassword(resetPasswordDto, user);
  }

  @Get('check-token')
  @ApiBearerAuth()
  @SwaggerAuthCheckToken()
  checkToken(@CurrentUser() user: User) {
    return user;
  }

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleCallback(
    @Req() req: authRequestInterface.AuthRequest,
    @Res() res: express.Response,
  ) {
    const user: User = req.user;
    const token = this.authService.login(user);

    return res.redirect(
      `${process.env.GOOGLE_REDIRECT_URL}?token=${token.access_token}`,
    );
  }
}
