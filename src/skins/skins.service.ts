import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkinDto } from './dto/create-skin.dto';
import { UpdateSkinDto } from './dto/update-skin.dto';
import { Rarity, Skin } from './entities/skin.entity';

@Injectable()
export class SkinsService {
  constructor(
    @InjectRepository(Skin)
    private skinsRepository: Repository<Skin>,
  ) {}

  async create(createSkinDto: CreateSkinDto) {
    const hasSkin = await this.skinsRepository.findOne({
      where: {
        name: createSkinDto.name,
        gun: createSkinDto.gun,
      },
    });

    if (hasSkin) {
      throw new HttpException('skinAlreadyExists', HttpStatus.SEE_OTHER);
    }

    if (
      createSkinDto.rarity === Rarity.EXCLUSIVE_EDITION &&
      !createSkinDto.price
    )
      throw new HttpException(
        'exclusiveEditionPriceRequired',
        HttpStatus.BAD_REQUEST,
      );

    if (
      createSkinDto.rarity !== Rarity.EXCLUSIVE_EDITION &&
      createSkinDto.price
    )
      throw new HttpException('priceNotAllowed', HttpStatus.BAD_REQUEST);

    return this.skinsRepository.save(
      this.skinsRepository.create(createSkinDto),
    );
  }

  findAll() {
    return `This action returns all skins`;
  }

  findOne(id: string) {
    return `This action returns a #${id} skin`;
  }

  update(id: string, updateSkinDto: UpdateSkinDto) {
    return { id, ...updateSkinDto };
  }

  remove(id: string) {
    return `This action removes a #${id} skin`;
  }
}
