import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/roles/roles.enum';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { ILike, Repository } from 'typeorm';
import { CreateSkinDto } from './dto/create-skin.dto';
import { SearchSkinDto } from './dto/search-skin.dto';
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

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
    searchSkinDto: SearchSkinDto,
    user: any,
  ): Promise<Skin[]> {
    if (searchSkinDto.order) {
      const [orderField, orderType] = searchSkinDto.order.split(' ');
      if (!['name', 'gun', 'rarity', 'price', 'available'].includes(orderField))
        throw new HttpException('invalidOrderField', HttpStatus.BAD_REQUEST);
      if (!['asc', 'desc'].includes(orderType))
        throw new HttpException('invalidOrderType', HttpStatus.BAD_REQUEST);
    }

    const showUnavailableSkins = user?.role === 'admin';

    return this.skinsRepository.find({
      where: {
        name: ILike(`%${searchSkinDto.name ?? ''}%`),
        gun: searchSkinDto.gun,
        rarity: searchSkinDto.rarity,
        price: searchSkinDto.price,
        available: searchSkinDto.available
          ? searchSkinDto.available ?? showUnavailableSkins
          : undefined,
      },
      order: {
        [searchSkinDto.order?.split(' ')[0]]:
          searchSkinDto.order?.split(' ')[1] === 'desc' ? 'DESC' : 'ASC',
      },
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  async findOne(id: string, user: any) {
    const skin = await this.skinsRepository.findOne({ where: { id } });
    if (!skin) throw new HttpException('skinNotFound', HttpStatus.NOT_FOUND);
    if (!skin.available && user?.role?.id !== RoleEnum.admin)
      throw new HttpException('skinUnavailable', HttpStatus.FORBIDDEN);
    return skin;
  }

  async update(id: string, updateSkinDto: UpdateSkinDto): Promise<Skin> {
    const skin = await this.skinsRepository.findOne({ where: { id } });
    if (!skin) throw new HttpException('skinNotFound', HttpStatus.NOT_FOUND);

    if (
      updateSkinDto.rarity === Rarity.EXCLUSIVE_EDITION &&
      !updateSkinDto.price
    )
      throw new HttpException(
        'exclusiveEditionPriceRequired',
        HttpStatus.BAD_REQUEST,
      );

    await this.skinsRepository.update(
      { id },
      {
        ...updateSkinDto,
      },
    );

    return this.skinsRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    return this.skinsRepository.delete({ id });
  }
}
