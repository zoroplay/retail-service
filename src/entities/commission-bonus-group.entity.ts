import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'commission_bonus_groups' })
export class CommissionBonusGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  group: string;
  @Column({
    type: 'double',
    precision: 8,
    scale: 2,
    default: 0,
  })
  minSel: number;
  @Column({
    type: 'double',
    precision: 8,
    scale: 2,
    default: 0,
  })
  maxSel: number;
  @Column({
    type: 'double',
    precision: 8,
    scale: 2,
    default: 0,
  })
  rateIsLess: number;
  @Column({
    type: 'double',
    precision: 8,
    scale: 2,
    default: 0,
  })
  rateIsMore: number;
  @Column({
    type: 'double',
    precision: 8,
    scale: 2,
    default: 0,
  })
  rate: number;
  @Column({
    type: 'double',
    precision: 8,
    scale: 2,
    default: 0,
  })
  targetStake: number;
  @Column({
    default: 0,
  })
  targetCoupon: number;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
