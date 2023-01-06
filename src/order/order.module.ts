import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Skin } from 'src/skins/entities/skin.entity';
import { Order } from './entities/order.entity';
import { SkinsModule } from 'src/skins/skins.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Skin]), SkinsModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
