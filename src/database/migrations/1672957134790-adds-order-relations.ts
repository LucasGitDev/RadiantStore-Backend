import { MigrationInterface, QueryRunner } from 'typeorm';

export class addsOrderRelations1672957134790 implements MigrationInterface {
  name = 'addsOrderRelations1672957134790';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order_skins_skin" ("orderId" uuid NOT NULL, "skinId" uuid NOT NULL, CONSTRAINT "PK_a5701c7c8b9411d3223f7fa1695" PRIMARY KEY ("orderId", "skinId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_741c26b1757c11f0cc614be903" ON "order_skins_skin" ("orderId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_631de6cb49812ba4ac27d8f932" ON "order_skins_skin" ("skinId") `,
    );
    await queryRunner.query(`ALTER TABLE "order" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_skins_skin" ADD CONSTRAINT "FK_741c26b1757c11f0cc614be9032" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_skins_skin" ADD CONSTRAINT "FK_631de6cb49812ba4ac27d8f9322" FOREIGN KEY ("skinId") REFERENCES "skin"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_skins_skin" DROP CONSTRAINT "FK_631de6cb49812ba4ac27d8f9322"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_skins_skin" DROP CONSTRAINT "FK_741c26b1757c11f0cc614be9032"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "userId"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_631de6cb49812ba4ac27d8f932"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_741c26b1757c11f0cc614be903"`,
    );
    await queryRunner.query(`DROP TABLE "order_skins_skin"`);
  }
}
