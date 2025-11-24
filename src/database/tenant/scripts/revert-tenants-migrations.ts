import AdminDataSource from "../../admin/admin.datasource";
import { Tenant } from "src/modules/tenants/entities/tenant.entity";
import TenantDataSource from "../tenant.datasource";

async function revertMigrationsForTenants() {
  console.log('🔍 Connecting to admin DB...');
  const adminDataSource = AdminDataSource;

  await adminDataSource.initialize();

  const tenants = await adminDataSource.getRepository(Tenant).find();
  console.log(`🧩 Found ${tenants.length} tenants`);

  for (const tenant of tenants) {
    console.log(`↩️  Reverting last migration for tenant ${tenant.name}...`);

    try {
      const tenantDataSource = TenantDataSource;

      tenantDataSource.setOptions({
        database: tenantDataSource.options.database + tenant.id,
      });

      await tenantDataSource.initialize();
      await tenantDataSource.undoLastMigration();
      console.log(`✅ Reverted last migration for ${tenant.name}`);

      await tenantDataSource.destroy();
    } catch (err) {
      console.error(`❌ Failed to revert migration for ${tenant.name}:`, (err as Error).message);
    }
  }

  await adminDataSource.destroy();
  console.log('🎉 Revert completed for all tenants!');
}

revertMigrationsForTenants().catch(err => {
  console.error('❌ Revert failed:', err);
  process.exit(1);
});


