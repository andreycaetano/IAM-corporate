import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SystemModule } from './system/system.module';
import { RolesModule } from './roles/roles.module';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, SystemModule, RolesModule],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
