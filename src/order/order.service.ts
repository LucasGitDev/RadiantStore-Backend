import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/roles/roles.enum';
import { SkinsService } from 'src/skins/skins.service';
import { User } from 'src/users/entities/user.entity';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private skinsService: SkinsService,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (user.role.id === RoleEnum.admin) {
      throw new HttpException('adminCantBuySkins', HttpStatus.BAD_REQUEST);
    }

    if (user.cart.length === 0) {
      throw new HttpException('cartIsEmpty', HttpStatus.BAD_REQUEST);
    }

    const order = await this.ordersRepository.create({
      ...createOrderDto,
      user,
      skins: user.cart,
    });

    await this.ordersRepository.save(order);

    user.cart = [];
    await this.usersRepository.save(user);

    return order;
  }

  async addToCart(skinId: string, userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (user.role.id === RoleEnum.admin) {
      throw new HttpException('adminCantBuySkins', HttpStatus.BAD_REQUEST);
    }

    const skin = await this.skinsService.findOne(skinId, userId);

    const { cart } = user;
    if (cart.find((s) => s.id === skin.id)) {
      throw new HttpException('skinAlreadyInCart', HttpStatus.BAD_REQUEST);
    }
    cart.push(skin);
    user.cart = cart;

    await this.usersRepository.save(user);
    return cart;
  }

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
    user: any,
  ): Promise<Order[]> {
    const canSeeAllOrders = user.role.id === RoleEnum.admin;
    const where = canSeeAllOrders ? {} : { user: { id: user.id } };
    return this.ordersRepository.find({
      where,
      relations: ['user', 'skins'],
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(id: string, user: any) {
    const canSeeAllOrders = user.role.id === RoleEnum.admin;
    const where = canSeeAllOrders ? { id } : { id, user: { id: user.id } };
    return this.ordersRepository.findOne({
      where,
      relations: ['user', 'skins'],
    });
  }

  remove(id: string) {
    return this.ordersRepository.delete(id);
  }
}
