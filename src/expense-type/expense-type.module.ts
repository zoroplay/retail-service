import { Module } from '@nestjs/common';
import { ExpenseTypeService } from './expense-type.service';
import { ExpenseTypeController } from './expense-type.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ExpenseTypeController],
  providers: [ExpenseTypeService, PrismaService],
})
export class ExpenseTypeModule {}
