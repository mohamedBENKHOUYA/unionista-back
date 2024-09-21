import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserModelMigration1726780852902 implements MigrationInterface {
    name = 'UpdateUserModelMigration1726780852902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "email_address" TO "email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "email" TO "email_address"`);
    }

}
