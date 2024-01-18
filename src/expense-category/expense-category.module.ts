import { Module } from '@nestjs/common';
import { ExpenseCategoryService } from './expense-category.service';
import { ExpenseCategoryController } from './expense-category.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ExpenseCategoryController],
  providers: [ExpenseCategoryService, PrismaService],
})
export class ExpenseCategoryModule {}
