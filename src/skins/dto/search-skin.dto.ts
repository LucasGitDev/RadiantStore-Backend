import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Gun, Rarity } from '../entities/skin.entity';

export class SearchSkinDto {
  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Gun)
  gun?: Gun;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Rarity)
  rarity?: Rarity;

  @ApiProperty()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsOptional()
  available?: boolean;

  @ApiProperty()
  @IsOptional()
  order?: string;
}
