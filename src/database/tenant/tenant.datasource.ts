import { DataSource } from "typeorm";
import { config } from 'dotenv';
import { databaseConfig } from "src/config";
config();

const db = databaseConfig();

const TenantDataSource = new DataSource({
  type: db.tenant.type as any,
  host: db.tenant.host,
  port: db.tenant.port,
  username: db.tenant.username,
  password: db.tenant.password,
  database: db.tenant.databasePrefix,
  synchronize: db.tenant.synchronize,
  entities: db.tenant.entities,
  migrations: db.tenant.migrations,
  migrationsRun: false,
  logging: db.tenant.logging,
});

export default TenantDataSource;