import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, databaseConfig, jwtConfig, redisConfig, validationSchema } from './config';
import { TenantsModule } from './modules/tenants/tenants.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Tenant } from './modules/tenants/entities/tenant.entity';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { CurrentUserInterceptor } from './modules/auth/interceptors/current-user.interceptor';
import { RolesGuard } from './modules/users/guards/roles.guard';
import { EmailsModule } from './modules/emails/emails.module';
import { CurrentTenantInterceptor } from './modules/auth/interceptors/current-tenant.interceptor';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        databaseConfig,
        jwtConfig,
        redisConfig
      ],
      validationSchema: validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      }
    }),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        connection: {
          ...configService.get('redis')
        }
      }),
      inject: [ConfigService]
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
    EmailsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentTenantInterceptor
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule {}
