import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1764343538330 implements MigrationInterface {
    name = 'Migration1764343538330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "UQ_bd37bc320d2dc4a4cbbcd2993a1"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "jti"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "token" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "UQ_e9f62f5dcb8a54b84234c9e7a06" UNIQUE ("token")`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "updated_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "ip_address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "user_agent" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "user_agent"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "ip_address"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "UQ_e9f62f5dcb8a54b84234c9e7a06"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "jti" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "UQ_bd37bc320d2dc4a4cbbcd2993a1" UNIQUE ("jti")`);
    }

}
