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
  })
  minSel: number;
  @Column({
    type: 'double',
    precision: 8,
    scale: 2,
  })
  maxSel: number;
  @Column()
  rateIsLess: number;
  @Column()
  rateIsMore: number;
  @Column()
  rate: number;
  @Column({
    type: 'double',
    precision: 8,
    scale: 2,
  })
  targetStake: number;
  @Column()
  targetCoupon: number;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
