import { MigrationInterface, QueryRunner } from 'typeorm';

export class addsDatetimeToEntities1672966539140 implements MigrationInterface {
  name = 'addsDatetimeToEntities1672966539140';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "skin" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "skin" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "skin" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "skin" DROP COLUMN "createdAt"`);
  }
}
