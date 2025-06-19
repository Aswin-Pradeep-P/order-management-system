import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeOrderStatusType1750356163689 implements MigrationInterface {
    name = 'ChangeOrderStatusType1750356163689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')`);
        await queryRunner.query(`ALTER TABLE "order" ADD "status" "public"."order_status_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "createdAt" character varying NOT NULL`);
    }

}
