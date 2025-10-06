import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { Repository } from 'typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { GoogleUserProfile } from '@/auth/interfaces/google-user-profile.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleUserProfile,
    done: VerifyCallback,
  ): Promise<any> {
    const emailObj = (profile.emails || [])[0];

    if (!emailObj?.value)
      return done(new UnauthorizedException('Email address required'), false);

    const email: string = emailObj.value.toLowerCase();

    const emailVerified =
      profile._json?.email_verified === true || emailObj.verified;
    if (!emailVerified) {
      return done(
        new UnauthorizedException('Email verification required'),
        false,
      );
    }
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return done(new UnauthorizedException('User does not exist'));
    }

    let updated = false;

    if (!user.name) {
      user.name = profile.displayName;
      updated = true;
    }

    if (!user.googleId || user.googleId !== profile.id) {
      user.googleId = profile.id;
      updated = true;
    }

    if (!user.profilePicture || user.profilePicture !== profile._json.picture) {
      user.profilePicture = profile._json.picture;
      updated = true;
    }

    if (updated) await this.userRepository.save(user);

    done(null, user);
  }
}
