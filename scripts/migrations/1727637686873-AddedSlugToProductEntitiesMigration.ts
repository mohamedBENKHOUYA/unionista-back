import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedSlugToProductEntitiesMigration1727637686873 implements MigrationInterface {
    name = 'AddedSlugToProductEntitiesMigration1727637686873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_item" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_item" ADD CONSTRAINT "UQ_e7a3a971cf1979cc404a27b940c" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "product" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "UQ_8cfaf4a1e80806d58e3dbe69224" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "product_category" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_category" ADD CONSTRAINT "UQ_d7cf9c55e1fc04c672ce0f524b0" UNIQUE ("slug")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_category" DROP CONSTRAINT "UQ_d7cf9c55e1fc04c672ce0f524b0"`);
        await queryRunner.query(`ALTER TABLE "product_category" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "UQ_8cfaf4a1e80806d58e3dbe69224"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "product_item" DROP CONSTRAINT "UQ_e7a3a971cf1979cc404a27b940c"`);
        await queryRunner.query(`ALTER TABLE "product_item" DROP COLUMN "slug"`);
    }

}
