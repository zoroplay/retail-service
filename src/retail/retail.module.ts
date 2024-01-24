import { Module } from '@nestjs/common';
import { RetailController } from './retail.controller';
import { RetailService } from './retail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommissionEntity } from 'src/entities/commission.entity';
import { CommissionProfileEntity } from 'src/entities/commission-profile.entity';
import { CommissionBonusGroupEntity } from 'src/entities/commission-bonus-group.entity';
import { CommissionProfileTurnoverEntity } from 'src/entities/commission-turnover.entity';
import { UserCommissionProfileEntity } from 'src/entities/user-commission-profile.entity';
import { NormalPayoutEntity } from 'src/entities/normal-payout.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommissionEntity,
      CommissionProfileEntity,
      CommissionBonusGroupEntity,
      CommissionProfileTurnoverEntity,
      UserCommissionProfileEntity,
      NormalPayoutEntity,
    ]),
    HttpModule,
  ],
  controllers: [RetailController],
  providers: [RetailService],
})
export class RetailModule {}
