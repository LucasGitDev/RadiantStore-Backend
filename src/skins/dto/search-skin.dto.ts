import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Gun, Rarity } from '../entities/skin.entity';

export class SearchSkinDto {
  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty({ examples: Object.keys(Gun) })
  @IsOptional()
  @IsEnum(Gun)
  gun?: Gun;

  @ApiProperty({ examples: Object.keys(Rarity) })
  @IsOptional()
  @IsEnum(Rarity)
  rarity?: Rarity;

  @ApiProperty()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsOptional()
  available?: boolean;

  @ApiProperty({
    examples: [
      'name asc',
      'price asc',
      'gun desc',
      'rarity desc',
      'available desc',
    ],
  })
  @IsOptional()
  order?: string;
}
