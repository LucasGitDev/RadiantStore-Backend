import { MigrationInterface, QueryRunner } from "typeorm";

export class addsSkinsTable1672880904819 implements MigrationInterface {
    name = 'addsSkinsTable1672880904819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."skin_gun_enum" AS ENUM('Classic', 'Shorty', 'Frenzy', 'Ghost', 'Sheriff', 'Stinger', 'Spectre', 'Bulldog', 'Bucky', 'Judge', 'Guardian', 'Phantom', 'Vandal', 'Marshal', 'Operator', 'Ares', 'Odin', 'Knife')`);
        await queryRunner.query(`CREATE TYPE "public"."skin_rarity_enum" AS ENUM('Select Edition', 'Deluxe Edition', 'Premium Edition', 'Ultra Edition', 'Exclusive Edition')`);
        await queryRunner.query(`CREATE TABLE "skin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "gun" "public"."skin_gun_enum" NOT NULL, "rarity" "public"."skin_rarity_enum" NOT NULL, "price" integer, "available" boolean NOT NULL DEFAULT true, "photoId" uuid, CONSTRAINT "REL_e8ba6d112d5b79a8a8c2d59895" UNIQUE ("photoId"), CONSTRAINT "PK_97972756e0d7195ced4ee8a5a18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e7a039bc4094f641ff9bf9e9e0" ON "skin" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_e9d9fe1502f19495e3c3f875b1" ON "skin" ("gun") `);
        await queryRunner.query(`CREATE INDEX "IDX_cf847f6c98ce360f89a9449c76" ON "skin" ("rarity") `);
        await queryRunner.query(`ALTER TABLE "skin" ADD CONSTRAINT "FK_e8ba6d112d5b79a8a8c2d598951" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skin" DROP CONSTRAINT "FK_e8ba6d112d5b79a8a8c2d598951"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf847f6c98ce360f89a9449c76"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e9d9fe1502f19495e3c3f875b1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e7a039bc4094f641ff9bf9e9e0"`);
        await queryRunner.query(`DROP TABLE "skin"`);
        await queryRunner.query(`DROP TYPE "public"."skin_rarity_enum"`);
        await queryRunner.query(`DROP TYPE "public"."skin_gun_enum"`);
    }

}
