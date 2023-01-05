import { FileEntity } from 'src/files/entities/file.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  Index,
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

  @Column()
  price: number;

  @Column({ default: true })
  available: boolean;

  @OneToOne(() => FileEntity, {
    eager: true,
  })
  photo?: FileEntity | null;
}
