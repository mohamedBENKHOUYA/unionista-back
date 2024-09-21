import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAdminModelMigration1726736130114 implements MigrationInterface {
    name = 'UpdateAdminModelMigration1726736130114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "last_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "avatar_url" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "avatar_url"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "first_name"`);
    }

}
