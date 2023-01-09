import { Skin } from 'src/skins/entities/skin.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum OrderStatus {
  PENDING,
  PAID,
  CANCELLED,
  REFUNDED,
}

@Entity()
export class Order extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  paymentType: string | null;

  @Column({ nullable: true })
  total: number | null;

  @BeforeInsert()
  setTotal() {
    this.total = this.skins.reduce((acc, skin) => acc + skin.price, 0);
  }

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  @ManyToMany(() => Skin, { eager: true })
  @JoinTable()
  skins: Skin[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
