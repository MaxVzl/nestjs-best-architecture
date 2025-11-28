import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1764344102897 implements MigrationInterface {
    name = 'Migration1764344102897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "ip_address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "user_agent" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "user_agent" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "ip_address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "created_at" DROP DEFAULT`);
    }

}
