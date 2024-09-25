import { MigrationInterface, QueryRunner } from "typeorm";

export class UserToClientUpdateMigration1727249294362 implements MigrationInterface {
    name = 'UserToClientUpdateMigration1727249294362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop_order" DROP CONSTRAINT "FK_1bf0c89afd018fda4027b46650e"`);
        await queryRunner.query(`ALTER TABLE "shop_order" DROP CONSTRAINT "FK_8c0ffe3590b9e069adade513fad"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" DROP CONSTRAINT "FK_2486032b4fc81da82629c53f955"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" RENAME COLUMN "user_id" TO "client_id"`);
        await queryRunner.query(`CREATE TABLE "client_review" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating_value" integer NOT NULL, "comment" text, "client_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_ac39ec463452c1787cab455bbd1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_payment_method" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" character varying NOT NULL, "account_number" character varying NOT NULL, "expiry_date" date NOT NULL, "is_default" boolean NOT NULL DEFAULT false, "payment_type_id" uuid NOT NULL, "client_id" uuid NOT NULL, CONSTRAINT "PK_d858308f34f99b9df3a89796b14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying, "avatar_url" character varying, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_address_relation" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_default" boolean NOT NULL, "address_id" uuid, "client_id" uuid, CONSTRAINT "PK_702dab2c368de768143193d190d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shop_order" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "shop_order" DROP COLUMN "user_payment_method_id"`);
        await queryRunner.query(`ALTER TABLE "shop_order" ADD "client_id" uuid`);
        await queryRunner.query(`ALTER TABLE "shop_order" ADD "client_payment_method_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_review" ADD CONSTRAINT "FK_9cb41367940304203f471e22174" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_review" ADD CONSTRAINT "FK_bdf942e9724c692266f9cbba4be" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_payment_method" ADD CONSTRAINT "FK_3aa47db38fb5004059f33f92048" FOREIGN KEY ("payment_type_id") REFERENCES "payment_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_payment_method" ADD CONSTRAINT "FK_52cbe2b6bbcaea36df3479bd758" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_address_relation" ADD CONSTRAINT "FK_941bf82d2853d7ef4cd1eb40cbc" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_address_relation" ADD CONSTRAINT "FK_ed53b761c1f083ecdb57a28c045" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shop_order" ADD CONSTRAINT "FK_9237e093815e5e00fb2975e8a21" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shop_order" ADD CONSTRAINT "FK_46987c7731397b06046e962c942" FOREIGN KEY ("client_payment_method_id") REFERENCES "client_payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" ADD CONSTRAINT "FK_b6c5364d23c79927abac8698802" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_cart" DROP CONSTRAINT "FK_b6c5364d23c79927abac8698802"`);
        await queryRunner.query(`ALTER TABLE "shop_order" DROP CONSTRAINT "FK_46987c7731397b06046e962c942"`);
        await queryRunner.query(`ALTER TABLE "shop_order" DROP CONSTRAINT "FK_9237e093815e5e00fb2975e8a21"`);
        await queryRunner.query(`ALTER TABLE "client_address_relation" DROP CONSTRAINT "FK_ed53b761c1f083ecdb57a28c045"`);
        await queryRunner.query(`ALTER TABLE "client_address_relation" DROP CONSTRAINT "FK_941bf82d2853d7ef4cd1eb40cbc"`);
        await queryRunner.query(`ALTER TABLE "client_payment_method" DROP CONSTRAINT "FK_52cbe2b6bbcaea36df3479bd758"`);
        await queryRunner.query(`ALTER TABLE "client_payment_method" DROP CONSTRAINT "FK_3aa47db38fb5004059f33f92048"`);
        await queryRunner.query(`ALTER TABLE "client_review" DROP CONSTRAINT "FK_bdf942e9724c692266f9cbba4be"`);
        await queryRunner.query(`ALTER TABLE "client_review" DROP CONSTRAINT "FK_9cb41367940304203f471e22174"`);
        await queryRunner.query(`ALTER TABLE "shop_order" DROP COLUMN "client_payment_method_id"`);
        await queryRunner.query(`ALTER TABLE "shop_order" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "shop_order" ADD "user_payment_method_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shop_order" ADD "user_id" uuid`);
        await queryRunner.query(`DROP TABLE "client_address_relation"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "client_payment_method"`);
        await queryRunner.query(`DROP TABLE "client_review"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" RENAME COLUMN "client_id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" ADD CONSTRAINT "FK_2486032b4fc81da82629c53f955" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shop_order" ADD CONSTRAINT "FK_8c0ffe3590b9e069adade513fad" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shop_order" ADD CONSTRAINT "FK_1bf0c89afd018fda4027b46650e" FOREIGN KEY ("user_payment_method_id") REFERENCES "user_payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
