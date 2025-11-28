import AdminDataSource from "../../admin/admin.datasource";
import { Tenant } from "src/modules/tenants/entities/tenant.entity";
import TenantDataSource from "../tenant.datasource";
import { DataSource } from "typeorm";

async function runMigrationsForTenants() {
  console.log('🔍 Connecting to admin DB...');
  const adminDataSource = AdminDataSource;

  await adminDataSource.initialize();

  const tenants = await adminDataSource.getRepository(Tenant).find();
  console.log(`🧩 Found ${tenants.length} tenants`);

  for (const tenant of tenants) {
    console.log(`🚀 Running migrations for tenant ${tenant.name}...`);

    let tenantDataSource: DataSource | null = null;

    try {
      tenantDataSource = new DataSource({
        ...TenantDataSource.options,
        database: TenantDataSource.options.database + tenant.id,
      } as typeof TenantDataSource.options);

      await tenantDataSource.initialize();
      
      const pendingMigrations = await tenantDataSource.showMigrations();
      console.log(`📋 ${pendingMigrations ? 'Pending' : 'No'} migrations for ${tenant.name}`);

      await tenantDataSource.runMigrations();
      console.log(`✅ Migrations complete for ${tenant.name}`);

      await tenantDataSource.destroy();
    } catch (err) {
      console.error(`❌ Failed migrations for ${tenant.name}:`, err.message);
    } finally {
      if (tenantDataSource?.isInitialized) {
        await tenantDataSource.destroy();
      }
    }
  }

  await adminDataSource.destroy();
  console.log('🎉 All tenant migrations done!');
}

runMigrationsForTenants().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});