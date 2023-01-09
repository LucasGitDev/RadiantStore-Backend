import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterPhotoToImageOnSkinsTable1672881596558
  implements MigrationInterface
{
  name = 'alterPhotoToImageOnSkinsTable1672881596558';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "skin" DROP CONSTRAINT "FK_e8ba6d112d5b79a8a8c2d598951"`,
    );
    await queryRunner.query(
      `ALTER TABLE "skin" RENAME COLUMN "photoId" TO "imageId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "skin" ADD CONSTRAINT "FK_96bfe179c763a48b6b9251767e8" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "skin" DROP CONSTRAINT "FK_96bfe179c763a48b6b9251767e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "skin" RENAME COLUMN "imageId" TO "photoId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "skin" ADD CONSTRAINT "FK_e8ba6d112d5b79a8a8c2d598951" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
