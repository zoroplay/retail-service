import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LastApprovedModule } from './last-approved/last-approved.module';
import { PrismaService } from './prisma/prisma.service';
import { ExpenseTypeModule } from './expense-type/expense-type.module';
import { ExpenseModule } from './expense/expense.module';
import { CashInModule } from './cash-in/cash-in.module';
import { CashOutModule } from './cash-out/cash-out.module';
import { ExpenseCategoryModule } from './expense-category/expense-category.module';

@Module({
  imports: [LastApprovedModule, ExpenseTypeModule, ExpenseModule, CashInModule, CashOutModule, ExpenseCategoryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
