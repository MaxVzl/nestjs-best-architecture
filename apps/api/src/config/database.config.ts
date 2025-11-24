import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
  // Base de données ADMIN (centrale)
  admin: {
    type: process.env.ADMIN_DB_TYPE || 'postgres',
    host: process.env.ADMIN_DB_HOST || 'localhost',
    port: parseInt(process.env.ADMIN_DB_PORT || '5432', 10),
    username: process.env.ADMIN_DB_USERNAME || 'admin',
    password: process.env.ADMIN_DB_PASSWORD || 'password',
    database: process.env.ADMIN_DB_NAME || 'admin_db',
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    // entities: ['dist/database/admin/entities/**/*.entity.js'],
    migrations: ['dist/database/admin/migrations/**/*.js'],
  },

  // Base de données TENANT (template)
  tenant: {
    type: process.env.TENANT_DB_TYPE || 'postgres',
    host: process.env.TENANT_DB_HOST || 'localhost',
    port: parseInt(process.env.TENANT_DB_PORT || '5432', 10),
    username: process.env.TENANT_DB_USERNAME || 'tenant',
    password: process.env.TENANT_DB_PASSWORD || 'password',
    // Le nom de la DB sera dynamique par tenant
    databasePrefix: process.env.TENANT_DB_PREFIX || 'tenant_',
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    // entities: ['dist/database/tenant/entities/**/*.entity.js'],
    migrations: ['dist/database/tenant/migrations/**/*.js'],
  },

  // Pool de connexions
  poolSize: parseInt(process.env.DB_POOL_SIZE || '10', 10),
  connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '30000', 10),
}));