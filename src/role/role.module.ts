import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@app/auth';
import { RoleRepository } from './repository/role.repository';
import { RoleService } from './role.service';
import { RoleSeederService } from './seeder/role.seeder';

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([RoleRepository]),
  ],
  providers: [RoleService, RoleSeederService],
  exports: [RoleService, RoleSeederService],
})
export class RoleModule {}
