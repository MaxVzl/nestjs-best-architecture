import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1764327008201 implements MigrationInterface {
    name = 'Migration1764327008201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "UQ_9e432b7df0d182f8d292902d1a2" UNIQUE ("user_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "UQ_9e432b7df0d182f8d292902d1a2"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "user_id"`);
    }

}
