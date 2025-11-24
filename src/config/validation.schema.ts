import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // App
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),
  PORT: Joi.number().default(3000),
  APP_NAME: Joi.string().required(),
  APP_URL: Joi.string().uri().required(),

  // Admin Database
  ADMIN_DB_HOST: Joi.string().required(),
  ADMIN_DB_PORT: Joi.number().default(5432),
  ADMIN_DB_USERNAME: Joi.string().required(),
  ADMIN_DB_PASSWORD: Joi.string().required(),
  ADMIN_DB_NAME: Joi.string().required(),

  // Tenant Database
  TENANT_DB_HOST: Joi.string().required(),
  TENANT_DB_PORT: Joi.number().default(5432),
  TENANT_DB_USERNAME: Joi.string().required(),
  TENANT_DB_PASSWORD: Joi.string().required(),
  TENANT_DB_PREFIX: Joi.string().default('tenant_'),

  // JWT
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_ACCESS_EXPIRATION: Joi.string().default('15m'),
  JWT_REFRESH_EXPIRATION: Joi.string().default('7d'),

  // Redis/Queue
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string().optional(),

  // Multi-tenant
  TENANT_ID_SOURCE: Joi.string()
    .valid('header', 'subdomain', 'jwt')
    .default('header'),

  // Email
  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.number().default(587),
  EMAIL_SECURE: Joi.boolean().default(false),
  EMAIL_USER: Joi.string().required(),
  EMAIL_PASS: Joi.string().required(),
  EMAIL_FROM: Joi.string().required(),
});