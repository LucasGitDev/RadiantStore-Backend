import { Injectable } from '@nestjs/common';
import { CreateSkinDto } from './dto/create-skin.dto';
import { UpdateSkinDto } from './dto/update-skin.dto';

@Injectable()
export class SkinsService {
  create(createSkinDto: CreateSkinDto) {
    return createSkinDto;
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
