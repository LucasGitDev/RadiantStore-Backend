import { MigrationInterface, QueryRunner } from 'typeorm';

export class addsCartRelationToUsersTable1672956318346
  implements MigrationInterface
{
  name = 'addsCartRelationToUsersTable1672956318346';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_cart_skin" ("userId" uuid NOT NULL, "skinId" uuid NOT NULL, CONSTRAINT "PK_b64a7c0c721cf240f7bd3e4cccf" PRIMARY KEY ("userId", "skinId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b9fda849e925d94c8619702058" ON "user_cart_skin" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6188e439e3615da1228112078c" ON "user_cart_skin" ("skinId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_cart_skin" ADD CONSTRAINT "FK_b9fda849e925d94c86197020585" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_cart_skin" ADD CONSTRAINT "FK_6188e439e3615da1228112078c2" FOREIGN KEY ("skinId") REFERENCES "skin"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_cart_skin" DROP CONSTRAINT "FK_6188e439e3615da1228112078c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_cart_skin" DROP CONSTRAINT "FK_b9fda849e925d94c86197020585"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6188e439e3615da1228112078c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b9fda849e925d94c8619702058"`,
    );
    await queryRunner.query(`DROP TABLE "user_cart_skin"`);
  }
}
