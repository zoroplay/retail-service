import { Module } from '@nestjs/common';
import { CashInService } from './cash-in.service';
import { CashInController } from './cash-in.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CashInController],
  providers: [CashInService, PrismaService],
})
export class CashInModule {}
