import { Module } from '@nestjs/common';
import { SkinsService } from './skins.service';
import { SkinsController } from './skins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skin } from './entities/skin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Skin])],
  controllers: [SkinsController],
  providers: [SkinsService],
})
export class SkinsModule {}
