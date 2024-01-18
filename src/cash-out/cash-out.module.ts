import { Module } from '@nestjs/common';
import { CashOutService } from './cash-out.service';
import { CashOutController } from './cash-out.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CashOutController],
  providers: [CashOutService, PrismaService],
})
export class CashOutModule {}
