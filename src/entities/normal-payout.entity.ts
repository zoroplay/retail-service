import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'normal_payouts' })
export class NormalPayoutEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  betId: number;
  @Column()
  selectionsCount: number;
  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
    default: 0,
  })
  totalOdds: number;
  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
    default: 0,
  })
  stake: number;
  @Column()
  userId: number;
  @Column()
  clientId: number;
  @Column()
  profileId: number;
  @Column()
  profileGroup: string;
  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
    default: 0,
  })
  commission: number;
  @Column({ default: false })
  isPaid: boolean;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string;
}
