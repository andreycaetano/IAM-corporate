import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@/roles/entities/role.entity';
import { System } from '@/system/entities/system.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, System])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
