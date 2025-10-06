import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SystemModule } from './system/system.module';

@Module({
  imports: [UsersModule, AuthModule, SystemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
