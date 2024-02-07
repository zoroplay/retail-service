import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'power_payouts' })
export class PowerPayoutEntity {
  // saveTransaction(time(), 'System', $user->username, $amount, 'Monthly Power Bonus Payout', 'credit', $description, 'Internal Transfer', 0, $user->available_balance, 'Power Bonus', 1);
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  clientId: number;
  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
    default: 0,
  })
  totalStake: number;
  @Column()
  totalTickets: number;
  @Column()
  totalWeightedStake: number;
  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
    default: 0,
  })
  averageNoOfSelections: number;
  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
    default: 0,
  })
  grossProfit: number;
  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
    default: 0,
  })
  ggrPercent: number;
  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
    default: 0,
  })
  rateIsLess: number;
  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
    default: 0,
  })
  rateIsMore: number;
  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
    default: 0,
  })
  rate: number;
  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
    default: 0,
  })
  turnoverCommission: number;
  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
    default: 0,
  })
  monthlyBonus: number;
  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
    default: 0,
  })
  totalWinnings: number;
  @Column()
  status: boolean;
  @Column()
  message: string;
  @Column()
  isPaid: boolean;
  @Column({
    type: 'date',
  })
  fromDate: string;
  @Column({
    type: 'date',
  })
  toDate: string;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string;
}
