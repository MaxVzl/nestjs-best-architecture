import AdminDataSource from "../../admin/admin.datasource";
import { Tenant } from "src/modules/tenants/entities/tenant.entity";
import TenantDataSource from "../tenant.datasource";
import { DataSource } from "typeorm";

async function revertMigrationsForTenants() {
  console.log('🔍 Connecting to admin DB...');
  const adminDataSource = AdminDataSource;

  await adminDataSource.initialize();

  const tenants = await adminDataSource.getRepository(Tenant).find();
  console.log(`🧩 Found ${tenants.length} tenants`);

  for (const tenant of tenants) {
    console.log(`↩️  Reverting last migration for tenant ${tenant.name}...`);

    let tenantDataSource: DataSource | null = null;

    try {
      tenantDataSource = new DataSource({
        ...TenantDataSource.options,
        database: TenantDataSource.options.database + tenant.id,
      } as typeof TenantDataSource.options);

      await tenantDataSource.initialize();
      await tenantDataSource.undoLastMigration();
      console.log(`✅ Reverted last migration for ${tenant.name}`);

      await tenantDataSource.destroy();
    } catch (err) {
      console.error(`❌ Failed to revert migration for ${tenant.name}:`, (err as Error).message);
    } finally {
      if (tenantDataSource?.isInitialized) {
        await tenantDataSource.destroy();
      }
    }
  }

  await adminDataSource.destroy();
  console.log('🎉 Revert completed for all tenants!');
}

revertMigrationsForTenants().catch(err => {
  console.error('❌ Revert failed:', err);
  process.exit(1);
});


