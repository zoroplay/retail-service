import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CommissionProfileTurnoverEntity } from './commission-turnover.entity';

@Entity({ name: 'commission_profiles' })
export class CommissionProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  default: boolean;
  @Column()
  description: string;
  @Column()
  providerGroup: string;
  @Column({
    type: 'enum',
    enum: ['weekly', 'monthly'],
    default: 'weekly',
  })
  period: string;
  @Column({
    type: 'enum',
    enum: ['flat', 'multiple'],
    default: 'flat',
  })
  type: string;
  @Column({ nullable: true })
  percentage: number;
  @Column()
  commissionType: number;

  @OneToMany(
    () => CommissionProfileTurnoverEntity,
    (commissionProfileTurnover) => commissionProfileTurnover.commissionProfile,
    { cascade: true, eager: true },
  )
  turnovers: CommissionProfileTurnoverEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string;
}
