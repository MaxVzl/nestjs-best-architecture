import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsModule } from '../sessions/sessions.module';
import { AdminUsersController } from './controllers/admin-users.controller';
import { TenantsModule } from '../tenants/tenants.module';
  
@Module({
  imports: [TypeOrmModule.forFeature([User]), SessionsModule, forwardRef(() => TenantsModule)],
  providers: [UsersService],
  controllers: [UsersController, AdminUsersController],
  exports: [UsersService]
})
export class UsersModule {}
