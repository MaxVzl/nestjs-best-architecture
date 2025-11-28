import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, databaseConfig, jwtConfig, redisConfig, validationSchema } from './config';
import { TenantsModule } from './modules/tenants/tenants.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmailsModule } from './modules/emails/emails.module';
import { BullModule } from '@nestjs/bullmq';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { TenantDbModule } from './modules/tenant-db/tenant-db.module';
import { QueueModule } from './modules/queue/queue.module';
import { SessionsModule } from './modules/sessions/sessions.module';

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
      useFactory: (configService: ConfigService) => configService.get('database.admin'),
      inject: [ConfigService],
    } as TypeOrmModuleOptions),
    TenantsModule,
    UsersModule,
    AuthModule, 
    EmailsModule, ProfilesModule, TenantDbModule, QueueModule, SessionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
