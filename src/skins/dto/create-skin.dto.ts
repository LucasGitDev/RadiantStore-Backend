import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { FileEntity } from 'src/files/entities/file.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Gun, Rarity } from '../entities/skin.entity';

export class CreateSkinDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Gun)
  gun: Gun;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Rarity)
  rarity: Rarity;

  @ApiProperty()
  @IsOptional()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  available: boolean;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  image?: FileEntity | null;
}
