import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ErrorResponse,
  SuccessResponse,
  handleError,
  handleResponse,
} from 'src/common/helpers';

@Injectable()
export class ExpenseCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(
    createExpenseCategoryDto: CreateExpenseCategoryDto,
  ): Promise<ErrorResponse | SuccessResponse> {
    try {
      const { title, description } = createExpenseCategoryDto;

      const expenseCategory = await this.prisma.expenseCategory.create({
        data: {
          description,
          title,
        },
      });

      return handleResponse(
        expenseCategory,
        'Expense Category created successfully',
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
      const all = await this.prisma.expenseCategory.findMany();
      return handleResponse(
        all,
        'all expense categories fetched successfully',
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
      const expenseCategory = await this.prisma.expenseCategory.findUnique({
        where: {
          id,
        },
      });

      if (!expenseCategory)
        return handleError(
          'Expense category not found',
          null,
          HttpStatus.NOT_FOUND,
        );

      return handleResponse(
        expenseCategory,
        'Expense Category fetched successfully',
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
    updateExpenseCategoryDto: UpdateExpenseCategoryDto,
  ): Promise<ErrorResponse | SuccessResponse> {
    try {
      const { title, description } = updateExpenseCategoryDto;

      const expenseCategory = await this.prisma.expenseCategory.findUnique({
        where: {
          id,
        },
      });

      if (!expenseCategory)
        return handleError(
          'Expense Category not found',
          null,
          HttpStatus.NOT_FOUND,
        );

      const updatedExpenseCategory = await this.prisma.expenseCategory.update({
        where: { id },
        data: {
          title: title ? title : expenseCategory.title,
          description: description ? description : expenseCategory.description,
        },
      });

      handleResponse(
        updatedExpenseCategory,
        'Expense Category updated successfully',
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
      const expenseCategory = await this.prisma.expenseCategory.findUnique({
        where: {
          id,
        },
      });

      if (!expenseCategory)
        return handleError(
          'Expense Category not found',
          null,
          HttpStatus.NOT_FOUND,
        );
      await this.prisma.expenseCategory.delete({
        where: { id },
      });
      return handleResponse(
        null,
        'Expense Category deleted Successfully',
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
