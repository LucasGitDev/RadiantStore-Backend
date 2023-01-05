import { FileEntity } from 'src/files/entities/file.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Gun {
  CLASSIC = 'Classic',
  SHORTY = 'Shorty',
  FRENZY = 'Frenzy',
  GHOST = 'Ghost',
  SHERIFF = 'Sheriff',
  STINGER = 'Stinger',
  SPECTRE = 'Spectre',
  BULLDOG = 'Bulldog',
  BUCKY = 'Bucky',
  JUDGE = 'Judge',
  GUARDIAN = 'Guardian',
  PHANTOM = 'Phantom',
  VANDAL = 'Vandal',
  MARSHAL = 'Marshal',
  OPERATOR = 'Operator',
  ARES = 'Ares',
  ODIN = 'Odin',
  KNIFE = 'Knife',
}

export enum Rarity {
  SELECT_EDITION = 'Select Edition',
  DELUXE_EDITION = 'Deluxe Edition',
  PREMIUM_EDITION = 'Premium Edition',
  ULTRA_EDITION = 'Ultra Edition',
  EXCLUSIVE_EDITION = 'Exclusive Edition',
}

@Entity()
export class Skin extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  name: string;

  @Index()
  @Column({ type: 'enum', enum: Gun })
  gun: Gun;

  @Index()
  @Column({ type: 'enum', enum: Rarity })
  rarity: Rarity;

  @Column({ nullable: true })
  price: number | null;

  @BeforeInsert()
  @BeforeUpdate()
  setPrice() {
    switch (this.rarity) {
      case Rarity.SELECT_EDITION:
        this.price = 875;
        break;
      case Rarity.DELUXE_EDITION:
        this.price = 1275;
        break;
      case Rarity.PREMIUM_EDITION:
        this.price = 1775;
        break;
      case Rarity.ULTRA_EDITION:
        this.price = 2475;
        break;
    }
  }

  @Column({ default: true })
  available: boolean;

  @OneToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  photo?: FileEntity | null;
}
