import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseTypeDto } from './dto/create-expense-type.dto';
import { UpdateExpenseTypeDto } from './dto/update-expense-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ErrorResponse,
  SuccessResponse,
  handleError,
  handleResponse,
} from 'src/common/helpers';
import { ApproveDto } from './dto/approve-response.dto';
import { TransactionStatus } from '@prisma/client';

@Injectable()
export class ExpenseTypeService {
  constructor(private prisma: PrismaService) {}

  async create(
    createExpenseTypeDto: CreateExpenseTypeDto,
  ): Promise<ErrorResponse | SuccessResponse> {
    try {
      const { amount, category_id, fixed, title } = createExpenseTypeDto;

      const is_category = await this.prisma.expenseCategory.findUnique({
        where: { id: category_id },
      });

      if (!is_category)
        return handleError(`category not found`, null, HttpStatus.NOT_FOUND);

      const expenseType = await this.prisma.expenseType.create({
        data: {
          amount: Number(amount),
          category_id,
          fixed: Number(fixed),
          title,
        },
      });
      return handleResponse(
        expenseType,
        'Expense Type created successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      return handleError(
        `Error! Something went wrong`,
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<ErrorResponse | SuccessResponse> {
    try {
      const all = await this.prisma.expenseType.findMany();
      return handleResponse(
        all,
        'all expenses fetched successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      return handleError(
        `Error! Something went wrong`,
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string): Promise<ErrorResponse | SuccessResponse> {
    try {
      const expensetype = await this.prisma.expenseType.findUnique({
        where: {
          id,
        },
      });

      if (!expensetype)
        return handleError(
          'Expense Type not found',
          null,
          HttpStatus.NOT_FOUND,
        );

      return handleResponse(
        expensetype,
        'Expense fetched successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      return handleError(
        `Error! Something went wrong`,
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async approve(
    id: string,
    updateExpenseTypeDto: ApproveDto,
  ): Promise<ErrorResponse | SuccessResponse> {
    try {
      const { status } = updateExpenseTypeDto;

      const ExpenseType = await this.prisma.expenseType.findUnique({
        where: {
          id,
        },
      });

      if (!ExpenseType)
        return handleError(
          `Expense Type does not exist`,
          null,
          HttpStatus.NOT_FOUND,
        );

      if (status.toUpperCase() === TransactionStatus.APPROVED) {
        const updatedExpenseType = await this.prisma.expenseType.update({
          where: { id },
          data: {
            status: TransactionStatus.APPROVED,
          },
        });
        return handleResponse(
          updatedExpenseType,
          'Expense Type updated successfully',
          HttpStatus.OK,
        );
      }

      if (status.toUpperCase() === TransactionStatus.REJECTED) {
        const updatedExpenseType = await this.prisma.expenseType.update({
          where: { id },
          data: {
            status: TransactionStatus.REJECTED,
          },
        });
        return handleResponse(
          updatedExpenseType,
          'Expense Type updated successfully',
          HttpStatus.OK,
        );
      }

      return handleError(
        `Status state of ${status} does not match expected state`,
        null,
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      return handleError(
        `Error! Something went wrong`,
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async update(
    id: string,
    updateExpenseTypeDto: UpdateExpenseTypeDto,
  ): Promise<ErrorResponse | SuccessResponse> {
    try {
      const { amount, category_id, fixed, title } = updateExpenseTypeDto;
      const ExpenseType = await this.prisma.expenseType.findUnique({
        where: {
          id,
        },
      });

      if (!ExpenseType)
        return handleError(
          `Expense does not exist`,
          null,
          HttpStatus.NOT_FOUND,
        );
      if (ExpenseType.status === TransactionStatus.APPROVED)
        return handleError(
          `Expense Type APPROVED, cannot be edited`,
          null,
          HttpStatus.NOT_ACCEPTABLE,
        );

      const updatedExpenseType = await this.prisma.expenseType.update({
        where: { id },
        data: {
          amount: amount ? Number(amount) : ExpenseType.amount,
          category_id: category_id ? category_id : ExpenseType.category_id,
          fixed: fixed ? Number(fixed) : ExpenseType.fixed,
          title: title ? title : ExpenseType.title,
        },
      });
      return handleResponse(
        updatedExpenseType,
        'Expense Type updated successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      return handleError(
        `Error! Something went wrong`,
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string): Promise<ErrorResponse | SuccessResponse> {
    try {
      const ExpenseType = await this.prisma.expenseType.findUnique({
        where: {
          id,
        },
      });

      if (!ExpenseType)
        return handleError(
          `Expense type does not exist`,
          null,
          HttpStatus.NOT_FOUND,
        );
      await this.prisma.expenseType.delete({
        where: { id },
      });
      return handleResponse(
        null,
        'Expense type deleted Successfully',
        HttpStatus.OK,
      );
    } catch (error) {
      return handleError(
        `Error! Something went wrong`,
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
