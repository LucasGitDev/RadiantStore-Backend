import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { infinityPagination } from 'src/utils/infinity-pagination';

@ApiBearerAuth()
@ApiTags('Orders')
@Controller({
  path: 'order',
  version: '1',
})
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.orderService.create(createOrderDto, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('add/:id')
  async addToCart(@Param('id') id: string, @Request() req) {
    return this.orderService.addToCart(id, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('remove/:id')
  removeFromCart(@Param('id') id: string, @Request() req) {
    return this.orderService.removeFromCart(id, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get')
  getCart(@Request() req) {
    return this.orderService.getCart(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Request() req,
  ) {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.orderService.findManyWithPagination(
        {
          page,
          limit,
        },
        req.user,
      ),
      { page, limit },
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.orderService.findOne(id, req.user);
  }

  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
