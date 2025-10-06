import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { User } from '@/users/entities/user.entity';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { UserPayload } from './interfaces/user-payload.interface';
import { UserToken } from './interfaces/user-token.interface';
import { UsersService } from '@/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return instanceToPlain(user) as User;
      }
    }

    throw new UnauthorizedException('Email ou senha estão incorretos!');
  }

  async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { email: forgotPasswordDto.email },
    });

    if (user) {
      const resetToken = this.jwtService.sign(
        { sub: user.id, email: user.email, name: user.name },
        { expiresIn: '1h' },
      );
      Object.assign(user, { resetToken });

      await this.userRepository.save(user);
      // TODO aplicar envio de email para redefinir senha
      // const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

      // await this.emailService.sendResetPasswordEmail(user.email, resetLink);
    }
    return { message: 'Email enviado com sucesso!' };
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
    user: User,
  ): Promise<User> {
    Object.assign(user, {
      password: await bcrypt.hash(resetPasswordDto.password, 10),
      resetToken: null,
    });

    return instanceToPlain(await this.userRepository.save(user)) as User;
  }
}
