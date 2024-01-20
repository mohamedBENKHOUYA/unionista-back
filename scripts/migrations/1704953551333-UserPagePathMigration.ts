import { MigrationInterface, QueryRunner } from "typeorm";

export class UserPagePathMigration1704953551333 implements MigrationInterface {
    name = 'UserPagePathMigration1704953551333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar_path" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar_path"`);
    }

}
