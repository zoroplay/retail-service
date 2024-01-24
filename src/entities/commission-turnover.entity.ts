import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { CommissionProfileEntity } from './commission-profile.entity';

@Entity({ name: 'commission_turnovers' })
export class CommissionProfileTurnoverEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  event: number;
  @ManyToOne(
    () => CommissionProfileEntity,
    (commissionProfile) => commissionProfile.turnovers,
    {
      orphanedRowAction: 'delete',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  commissionProfile: CommissionProfileEntity;
  @Column({
    type: 'double',
    precision: 8,
    scale: 2,
  })
  percentage: number;
  @Column({
    type: 'double',
    precision: 8,
    scale: 2,
  })
  maxOdd: number;
  @Column({
    type: 'double',
    precision: 8,
    scale: 2,
  })
  minOdd: number;
  @Column()
  oddSet: boolean;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
