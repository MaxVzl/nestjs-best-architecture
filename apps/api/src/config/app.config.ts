import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'My NestJS App',
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  apiPrefix: process.env.API_PREFIX || 'api',
  url: process.env.APP_URL || 'http://localhost:3000',
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3001'],
  
  // Multi-tenant config
  tenantIdentification: process.env.TENANT_ID_SOURCE || 'header', // 'header' | 'subdomain' | 'jwt'
  tenantHeaderName: process.env.TENANT_HEADER || 'X-Tenant-Id',
}));