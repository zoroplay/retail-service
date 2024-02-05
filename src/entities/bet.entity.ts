import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'bets' })
export class BetEntity {
  // saveTransaction(time(), 'System', $user->username, $amount, 'Monthly Power Bonus Payout', 'credit', $description, 'Internal Transfer', 0, $user->available_balance, 'Power Bonus', 1);
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  betId: number;
  @Column()
  userId: number;
  @Column()
  clientId: number;
  @Column()
  selectionCount: number;
  @Column({ type: 'timestamp', nullable: true })
  cancelledDate: Date;
  @Column({ type: 'timestamp', nullable: true })
  settledDate: Date;
  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
    default: 0,
  })
  stake: number;
  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
    default: 0,
  })
  commission: number;
  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
    default: 0,
  })
  winnings: number;
  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
    default: 0,
  })
  weightedStake: number;
  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
    default: 0,
  })
  odds: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
