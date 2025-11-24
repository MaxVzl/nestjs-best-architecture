import AdminDataSource from "../../admin/admin.datasource";
import { Tenant } from "src/modules/tenants/entities/tenant.entity";
import TenantDataSource from "../tenant.datasource";

async function runMigrationsForTenants() {
  console.log('🔍 Connecting to admin DB...');
  const adminDataSource = AdminDataSource;

  await adminDataSource.initialize();

  const tenants = await adminDataSource.getRepository(Tenant).find();
  console.log(`🧩 Found ${tenants.length} tenants`);

  for (const tenant of tenants) {
    console.log(`🚀 Running migrations for tenant ${tenant.name}...`);

    try {
      const tenantDataSource = TenantDataSource;

      tenantDataSource.setOptions({
        database: tenantDataSource.options.database + tenant.id,
      });

      await tenantDataSource.initialize();
      await tenantDataSource.runMigrations();
      console.log(`✅ Migrations complete for ${tenant.name}`);

      await tenantDataSource.destroy();
    } catch (err) {
      console.error(`❌ Failed migrations for ${tenant.name}:`, err.message);
    }
  }

  await adminDataSource.destroy();
  console.log('🎉 All tenant migrations done!');
}

runMigrationsForTenants().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});