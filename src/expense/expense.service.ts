import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ErrorResponse,
  SuccessResponse,
  handleError,
  handleResponse,
} from 'src/common/helpers';
import { TransactionStatus } from '@prisma/client';
import { ApproveDto } from './dto/approve-response.dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}
  async create(
    createExpenseDto: CreateExpenseDto,
  ): Promise<ErrorResponse | SuccessResponse> {
    try {
      const { amount, expense_type_id, branch_id, user_id, comment } =
        createExpenseDto;

      const expense = await this.prisma.expense.create({
        data: {
          amount: Number(amount),
          comment,
          expense_type_id,
          branch_id,
          user_id,
        },
      });
      return handleResponse(
        expense,
        'Expense created successfully',
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
      const all = await this.prisma.expense.findMany();
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
      const expense = await this.prisma.expense.findUnique({
        where: {
          id,
        },
      });

      if (!expense)
        return handleError(`Expense doesn't exist`, null, HttpStatus.NOT_FOUND);

      return handleResponse(
        expense,
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

  async update(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<ErrorResponse | SuccessResponse> {
    try {
      const { amount, expense_type_id, branch_id, user_id, comment } =
        updateExpenseDto;
      const Expense = await this.prisma.expense.findUnique({
        where: {
          id,
        },
      });


      
      if (!Expense)
        return handleError(
          `Expense does not exist`,
          null,
          HttpStatus.NOT_FOUND,
        );
      if (Expense.status === TransactionStatus.APPROVED)
        return handleError(
          `Expense APPROVED, cannot be edited`,
          null,
          HttpStatus.NOT_ACCEPTABLE,
        );

      const updatedExpense = await this.prisma.expense.update({
        where: { id },
        data: {
          amount: amount ? Number(amount) : Expense.amount,
          expense_type_id: expense_type_id
            ? expense_type_id
            : Expense.expense_type_id,
          branch_id: branch_id ? branch_id : Expense.branch_id,
          user_id: user_id ? user_id : Expense.user_id,
          comment: comment ? comment : Expense.comment,
        },
      });
      return handleResponse(
        updatedExpense,
        'Expense updated successfully',
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
    updateExpenseDto: ApproveDto,
  ): Promise<ErrorResponse | SuccessResponse> {
    try {
      const { status, approved_by } = updateExpenseDto;
      const Expense = await this.prisma.expense.findUnique({
        where: {
          id,
        },
      });

      if (!Expense)
        return handleError(
          `Expense does not exist`,
          null,
          HttpStatus.NOT_FOUND,
        );
      if (status.toUpperCase() === TransactionStatus.APPROVED) {
        const updatedExpense = await this.prisma.expense.update({
          where: { id },
          data: {
            status: TransactionStatus.APPROVED,
            approved_by,
            approved_at: new Date(),
          },
        });
        return handleResponse(
          updatedExpense,
          'Expense Approved successfully',
          HttpStatus.OK,
        );
      }
      if (status.toUpperCase() === TransactionStatus.REJECTED) {
        const updatedExpense = await this.prisma.expense.update({
          where: { id },
          data: {
            status: TransactionStatus.REJECTED,
            approved_by,
            approved_at: null,
          },
        });
        return handleResponse(
          updatedExpense,
          'Expense Rejected successfully',
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

  async remove(id: string): Promise<ErrorResponse | SuccessResponse> {
    try {
      const Expense = await this.prisma.expense.findUnique({
        where: {
          id,
        },
      });

      if (!Expense)
        return handleError(
          `Expense does not exist`,
          null,
          HttpStatus.NOT_FOUND,
        );
      await this.prisma.expense.delete({
        where: { id },
      });
      return handleResponse(
        null,
        'Expense deleted Successfully',
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
