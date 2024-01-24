import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'commissions' })
export class CommissionEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  totalTickets: number;
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  totalStakes: number;
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  totalWon: number;
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  net: number;
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  commission: number;
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  profit: number;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ default: false })
  isPaid: boolean;

  @Column({ nullable: true })
  userCommissionProfileId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
