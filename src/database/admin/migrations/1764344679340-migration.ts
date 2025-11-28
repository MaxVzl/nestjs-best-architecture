import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1764344679340 implements MigrationInterface {
    name = 'Migration1764344679340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "token" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "token" DROP DEFAULT`);
    }

}
