import { DataSource } from "typeorm";
import { config } from 'dotenv';
import { databaseConfig } from "src/config";
config();

const db = databaseConfig();

const AdminDataSource = new DataSource({
  type: db.admin.type as any,
  host: db.admin.host,
  port: db.admin.port,
  username: db.admin.username,
  password: db.admin.password,
  database: db.admin.database,
  synchronize: db.admin.synchronize,
  entities: db.admin.entities,
  migrations: db.admin.migrations,
  migrationsRun: false,
  logging: db.admin.logging,
});

export default AdminDataSource;