import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSomeColumnsNamesMigration1727503571737 implements MigrationInterface {
    name = 'UpdateSomeColumnsNamesMigration1727503571737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_category" DROP CONSTRAINT "FK_da9613eb01460b9c388f70500c9"`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" DROP CONSTRAINT "FK_9c26bfd610456dea28915ad54ee"`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" DROP CONSTRAINT "FK_7191088b16e854fdb06bc508b05"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7191088b16e854fdb06bc508b0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9c26bfd610456dea28915ad54e"`);
        await queryRunner.query(`ALTER TABLE "product_category_translation" RENAME COLUMN "category_name" TO "name"`);
        await queryRunner.query(`ALTER TABLE "product_item" RENAME COLUMN "image_path" TO "image_url"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "image_path" TO "image_url"`);
        await queryRunner.query(`ALTER TABLE "product_category" DROP COLUMN "parent_category_id"`);
        await queryRunner.query(`ALTER TABLE "product_category" DROP COLUMN "image_path"`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" DROP CONSTRAINT "PK_bec67d915df0228ba776dccede8"`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" ADD CONSTRAINT "PK_9c26bfd610456dea28915ad54ee" PRIMARY KEY ("variationOptionId")`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" DROP COLUMN "productItemId"`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" DROP CONSTRAINT "PK_9c26bfd610456dea28915ad54ee"`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" DROP COLUMN "variationOptionId"`);
        await queryRunner.query(`ALTER TABLE "variation" ADD "value" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_category" ADD "image_url" character varying`);
        await queryRunner.query(`ALTER TABLE "product_category" ADD "parent_id" uuid`);
        await queryRunner.query(`ALTER TABLE "variation_option" ADD "value" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" ADD "product_item_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" ADD CONSTRAINT "PK_c731841f684746bae36a2b377b7" PRIMARY KEY ("product_item_id")`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" ADD "variation_option_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" DROP CONSTRAINT "PK_c731841f684746bae36a2b377b7"`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" ADD CONSTRAINT "PK_3fd70fdc94abecaef0a61debdeb" PRIMARY KEY ("product_item_id", "variation_option_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_c731841f684746bae36a2b377b" ON "productitem_variationoption_relation" ("product_item_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9f19a3ed97c916b144f5005810" ON "productitem_variationoption_relation" ("variation_option_id") `);
        await queryRunner.query(`ALTER TABLE "product_category" ADD CONSTRAINT "FK_17f434523d4566716f2b1c528a8" FOREIGN KEY ("parent_id") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" ADD CONSTRAINT "FK_c731841f684746bae36a2b377b7" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" ADD CONSTRAINT "FK_9f19a3ed97c916b144f50058100" FOREIGN KEY ("variation_option_id") REFERENCES "variation_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" DROP CONSTRAINT "FK_9f19a3ed97c916b144f50058100"`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" DROP CONSTRAINT "FK_c731841f684746bae36a2b377b7"`);
        await queryRunner.query(`ALTER TABLE "product_category" DROP CONSTRAINT "FK_17f434523d4566716f2b1c528a8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9f19a3ed97c916b144f5005810"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c731841f684746bae36a2b377b"`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" DROP CONSTRAINT "PK_3fd70fdc94abecaef0a61debdeb"`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" ADD CONSTRAINT "PK_c731841f684746bae36a2b377b7" PRIMARY KEY ("product_item_id")`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" DROP COLUMN "variation_option_id"`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" DROP CONSTRAINT "PK_c731841f684746bae36a2b377b7"`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" DROP COLUMN "product_item_id"`);
        await queryRunner.query(`ALTER TABLE "variation_option" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "product_category" DROP COLUMN "parent_id"`);
        await queryRunner.query(`ALTER TABLE "product_category" DROP COLUMN "image_url"`);
        await queryRunner.query(`ALTER TABLE "variation" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" ADD "variationOptionId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" ADD CONSTRAINT "PK_9c26bfd610456dea28915ad54ee" PRIMARY KEY ("variationOptionId")`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" ADD "productItemId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" DROP CONSTRAINT "PK_9c26bfd610456dea28915ad54ee"`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" ADD CONSTRAINT "PK_bec67d915df0228ba776dccede8" PRIMARY KEY ("productItemId", "variationOptionId")`);
        await queryRunner.query(`ALTER TABLE "product_category" ADD "image_path" character varying`);
        await queryRunner.query(`ALTER TABLE "product_category" ADD "parent_category_id" uuid`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "image_url" TO "image_path"`);
        await queryRunner.query(`ALTER TABLE "product_item" RENAME COLUMN "image_url" TO "image_path"`);
        await queryRunner.query(`ALTER TABLE "product_category_translation" RENAME COLUMN "name" TO "category_name"`);
        await queryRunner.query(`CREATE INDEX "IDX_9c26bfd610456dea28915ad54e" ON "productitem_variationoption_relation" ("variationOptionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7191088b16e854fdb06bc508b0" ON "productitem_variationoption_relation" ("productItemId") `);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" ADD CONSTRAINT "FK_7191088b16e854fdb06bc508b05" FOREIGN KEY ("productItemId") REFERENCES "product_item"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "productitem_variationoption_relation" ADD CONSTRAINT "FK_9c26bfd610456dea28915ad54ee" FOREIGN KEY ("variationOptionId") REFERENCES "variation_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_category" ADD CONSTRAINT "FK_da9613eb01460b9c388f70500c9" FOREIGN KEY ("parent_category_id") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
