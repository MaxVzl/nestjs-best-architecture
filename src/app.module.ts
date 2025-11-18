import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, databaseConfig, jwtConfig, queueConfig, validationSchema } from './config';
import { TenantsModule } from './modules/tenants/tenants.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Tenant } from './modules/tenants/entities/tenant.entity';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/tenant.entity';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        databaseConfig,
        jwtConfig,
        queueConfig
      ],
      validationSchema: validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      }
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database.admin'),
        entities: [Tenant, User],
      }),
      inject: [ConfigService],
    } as TypeOrmModuleOptions),
    TenantsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
