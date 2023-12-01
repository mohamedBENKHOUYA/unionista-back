import { MigrationInterface, QueryRunner } from "typeorm";

export class ShopInitialStructureMigration1701291705817 implements MigrationInterface {
    name = 'ShopInitialStructureMigration1701291705817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "country" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country_name" character varying NOT NULL, CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_type" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, CONSTRAINT "PK_4f301e328eaf2127773c889ab94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_payment_method" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" character varying NOT NULL, "account_number" character varying NOT NULL, "expiry_date" date NOT NULL, "is_default" boolean NOT NULL DEFAULT false, "payment_type_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7bc6324e8d41c2f3bd69c1d905f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "entity" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "discount_rate" integer NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, CONSTRAINT "PK_50a7741b415bc585fcf9c984332" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "variation" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "product_category_id" uuid NOT NULL, CONSTRAINT "PK_739a8640e52a196d9df6a31211a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_category" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category_name" character varying NOT NULL, "description" text, "image_path" character varying, "parent_category_id" uuid NOT NULL, CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "variation_option" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "variation_id" uuid NOT NULL, CONSTRAINT "PK_c625edd870a3d28448c1bf79837" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_line" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" integer NOT NULL, "product_item_id" uuid NOT NULL, "order_id" uuid NOT NULL, CONSTRAINT "PK_01a7c973d9f30479647e44f9892" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopping_cart" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, CONSTRAINT "PK_40f9358cdf55d73d8a2ad226592" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopping_cart_item" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "product_item_id" uuid NOT NULL, "shopping_cart_id" uuid NOT NULL, CONSTRAINT "PK_15909d00f68f8f022e5545745aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_item" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sku" character varying, "quantity_in_stock" integer NOT NULL DEFAULT '0', "image_path" character varying, "price" integer NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_83c3b7a80f6fe1d5ad7fa05a2a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text, "image_path" character varying, "category_id" uuid NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_review" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating_value" integer NOT NULL, "comment" text, "user_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_261724703ac0fe70a85eb3f3af6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_address_relation" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_default" boolean NOT NULL, "address_id" uuid, "user_id" uuid, CONSTRAINT "PK_999dd7612f099e8d546270e54e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying NOT NULL, "email_address" character varying NOT NULL, "password" character varying NOT NULL, "phone_number" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipping_method" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_b9b0adfad3c6b99229c1e7d4865" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_status_enum" AS ENUM('ordered', 'in-transit', 'out-for-delivery', 'delivered')`);
        await queryRunner.query(`CREATE TABLE "order_status" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."order_status_status_enum" NOT NULL DEFAULT 'ordered', CONSTRAINT "PK_8ea75b2a26f83f3bc98b9c6aaf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shop_order" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_date" TIMESTAMP NOT NULL, "order_total" integer NOT NULL, "user_id" uuid, "user_payment_method_id" uuid NOT NULL, "shipping_address_id" uuid NOT NULL, "shopping_method_id" uuid NOT NULL, "order_status_id" uuid NOT NULL, CONSTRAINT "PK_aff7956a99be3a90c1075744b6a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street_number" character varying NOT NULL, "address_line1" character varying NOT NULL, "address_line2" character varying NOT NULL, "city" character varying NOT NULL, "region" character varying NOT NULL, "postal_code" character varying NOT NULL, "country_id" uuid NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "promotion_productcategory_relation" ("entityId" uuid NOT NULL, "productCategoryId" uuid NOT NULL, CONSTRAINT "PK_6483e066c60032dfbcfa2da3fb0" PRIMARY KEY ("entityId", "productCategoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c9c697778621656c12e3397dca" ON "promotion_productcategory_relation" ("entityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a5ffd3f6989e871150ddce6910" ON "promotion_productcategory_relation" ("productCategoryId") `);
        await queryRunner.query(`CREATE TABLE "productitem_variationoption_relation" ("productItemId" uuid NOT NULL, "variationOptionId" uuid NOT NULL, CONSTRAINT "PK_bec67d915df0228ba776dccede8" PRIMARY KEY ("productItemId", "variationOptionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7191088b16e854fdb06bc508b0" ON "productitem_variationoption_relation" ("productItemId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9c26bfd610456dea28915ad54e" ON "productitem_variationoption_relation" ("variationOptionId") `);
        await queryRunner.query(`ALTER TABLE "user_payment_method" ADD CONSTRAINT "FK_1534185bac0466bf753dc977de4" FOREIGN KEY ("payment_type_id") REFERENCES "payment_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_payment_method" ADD CONSTRAINT "FK_410a5c63b418406480c3fd3c7d6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variation" ADD CONSTRAINT "FK_034eb08de2d9c528bbe4023721a" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_category" ADD CONSTRAINT "FK_da9613eb01460b9c388f70500c9" FOREIGN KEY ("parent_category_id") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variation_option" ADD CONSTRAINT "FK_f8c04c6c144a5f6087708a441a5" FOREIGN KEY ("variation_id") REFERENCES "variation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_line" ADD CONSTRAINT "FK_25b3ab0bf3e54dfb5271540ec59" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_line" ADD CONSTRAINT "FK_ed8fae6d7239e9d730219215af7" FOREIGN KEY ("order_id") REFERENCES "shop_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" ADD CONSTRAINT "FK_2486032b4fc81da82629c53f955" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_cart_item" ADD CONSTRAINT "FK_21133edd7dfd4d3ae49e70c3488" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_cart_item" ADD CONSTRAINT "FK_0a677ebcccd1fc534bf524f9618" FOREIGN KEY ("shopping_cart_id") REFERENCES "shopping_cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_item" ADD CONSTRAINT "FK_88ef002ea2f04e6bf896da91692" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_review" ADD CONSTRAINT "FK_89655b925f3ddc5ab2e8363052f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_review" ADD CONSTRAINT "FK_2189fc2a3e6588076f942035642" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_address_relation" ADD CONSTRAINT "FK_d7f5231adf35a5c11ce926fb8da" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_address_relation" ADD CONSTRAINT "FK_9f7464e347debe2d9f8f227052a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shop_order" ADD CONSTRAINT "FK_8c0ffe3590b9e069adade513fad" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shop_order" ADD CONSTRAINT "FK_1bf0c89afd018fda4027b46650e" FOREIGN KEY ("user_payment_method_id") REFERENCES "user_payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shop_order" ADD CONSTRAINT "FK_7e27356c932a20390e8d8df15ae" FOREIGN KEY ("shipping_address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shop_order" ADD CONSTRAINT "FK_b480d269266f5ba0c39ad19ee58" FOREIGN KEY ("shopping_method_id") REFERENCES "shipping_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shop_order" ADD CONSTRAINT "FK_d31fb82fed8a5d2c62ef5ef1037" FOREIGN KEY ("order_status_id") REFERENCES "order_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_7fc5b7774d17d6824c5938d20be" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "promotion_productcategory_relation" ADD CONSTRAINT "FK_c9c697778621656c12e3397dca7" FOREIGN KEY ("entityId") REFERENCES "entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "promotion_productcategory_relation" ADD CONSTRAINT "FK_a5ffd3f6989e871150ddce6910f" FOREIGN KEY ("productCategoryId") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" ADD CONSTRAINT "FK_7191088b16e854fdb06bc508b05" FOREIGN KEY ("productItemId") REFERENCES "product_item"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" ADD CONSTRAINT "FK_9c26bfd610456dea28915ad54ee" FOREIGN KEY ("variationOptionId") REFERENCES "variation_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" DROP CONSTRAINT "FK_9c26bfd610456dea28915ad54ee"`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" DROP CONSTRAINT "FK_7191088b16e854fdb06bc508b05"`);
        await queryRunner.query(`ALTER TABLE "promotion_productcategory_relation" DROP CONSTRAINT "FK_a5ffd3f6989e871150ddce6910f"`);
        await queryRunner.query(`ALTER TABLE "promotion_productcategory_relation" DROP CONSTRAINT "FK_c9c697778621656c12e3397dca7"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_7fc5b7774d17d6824c5938d20be"`);
        await queryRunner.query(`ALTER TABLE "shop_order" DROP CONSTRAINT "FK_d31fb82fed8a5d2c62ef5ef1037"`);
        await queryRunner.query(`ALTER TABLE "shop_order" DROP CONSTRAINT "FK_b480d269266f5ba0c39ad19ee58"`);
        await queryRunner.query(`ALTER TABLE "shop_order" DROP CONSTRAINT "FK_7e27356c932a20390e8d8df15ae"`);
        await queryRunner.query(`ALTER TABLE "shop_order" DROP CONSTRAINT "FK_1bf0c89afd018fda4027b46650e"`);
        await queryRunner.query(`ALTER TABLE "shop_order" DROP CONSTRAINT "FK_8c0ffe3590b9e069adade513fad"`);
        await queryRunner.query(`ALTER TABLE "user_address_relation" DROP CONSTRAINT "FK_9f7464e347debe2d9f8f227052a"`);
        await queryRunner.query(`ALTER TABLE "user_address_relation" DROP CONSTRAINT "FK_d7f5231adf35a5c11ce926fb8da"`);
        await queryRunner.query(`ALTER TABLE "user_review" DROP CONSTRAINT "FK_2189fc2a3e6588076f942035642"`);
        await queryRunner.query(`ALTER TABLE "user_review" DROP CONSTRAINT "FK_89655b925f3ddc5ab2e8363052f"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1"`);
        await queryRunner.query(`ALTER TABLE "product_item" DROP CONSTRAINT "FK_88ef002ea2f04e6bf896da91692"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart_item" DROP CONSTRAINT "FK_0a677ebcccd1fc534bf524f9618"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart_item" DROP CONSTRAINT "FK_21133edd7dfd4d3ae49e70c3488"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" DROP CONSTRAINT "FK_2486032b4fc81da82629c53f955"`);
        await queryRunner.query(`ALTER TABLE "order_line" DROP CONSTRAINT "FK_ed8fae6d7239e9d730219215af7"`);
        await queryRunner.query(`ALTER TABLE "order_line" DROP CONSTRAINT "FK_25b3ab0bf3e54dfb5271540ec59"`);
        await queryRunner.query(`ALTER TABLE "variation_option" DROP CONSTRAINT "FK_f8c04c6c144a5f6087708a441a5"`);
        await queryRunner.query(`ALTER TABLE "product_category" DROP CONSTRAINT "FK_da9613eb01460b9c388f70500c9"`);
        await queryRunner.query(`ALTER TABLE "variation" DROP CONSTRAINT "FK_034eb08de2d9c528bbe4023721a"`);
        await queryRunner.query(`ALTER TABLE "user_payment_method" DROP CONSTRAINT "FK_410a5c63b418406480c3fd3c7d6"`);
        await queryRunner.query(`ALTER TABLE "user_payment_method" DROP CONSTRAINT "FK_1534185bac0466bf753dc977de4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9c26bfd610456dea28915ad54e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7191088b16e854fdb06bc508b0"`);
        await queryRunner.query(`DROP TABLE "productitem_variationoption_relation"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a5ffd3f6989e871150ddce6910"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c9c697778621656c12e3397dca"`);
        await queryRunner.query(`DROP TABLE "promotion_productcategory_relation"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "shop_order"`);
        await queryRunner.query(`DROP TABLE "order_status"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_status_enum"`);
        await queryRunner.query(`DROP TABLE "shipping_method"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_address_relation"`);
        await queryRunner.query(`DROP TABLE "user_review"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product_item"`);
        await queryRunner.query(`DROP TABLE "shopping_cart_item"`);
        await queryRunner.query(`DROP TABLE "shopping_cart"`);
        await queryRunner.query(`DROP TABLE "order_line"`);
        await queryRunner.query(`DROP TABLE "variation_option"`);
        await queryRunner.query(`DROP TABLE "product_category"`);
        await queryRunner.query(`DROP TABLE "variation"`);
        await queryRunner.query(`DROP TABLE "entity"`);
        await queryRunner.query(`DROP TABLE "user_payment_method"`);
        await queryRunner.query(`DROP TABLE "payment_type"`);
        await queryRunner.query(`DROP TABLE "country"`);
    }

}
