import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAdminMigration1726769357068 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "admin" (first_name, last_name, email, password, avatar_url) VALUES('mbk', 'mbk', 'mohamed.benkhouya@gmail.com', '$2b$10$ixsItSykd3kaz4ft.WVPmOe9bI6q20GHSjWaI.gQBjV0ZN.KJrZGO', '')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `delete from "admin" where email="mohamed.benkhouya@gmail.com"`,
    );
  }
}
