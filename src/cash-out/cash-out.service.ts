import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCashOutDto } from './dto/create-cash-out.dto';
import { UpdateCashOutDto } from './dto/update-cash-out.dto';
import {
  ErrorResponse,
  SuccessResponse,
  handleError,
  handleResponse,
} from 'src/common/helpers';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionStatus } from '@prisma/client';
import { ApproveDto } from './dto/approve-response.dto';

@Injectable()
export class CashOutService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCashOutDto: CreateCashOutDto,
  ): Promise<ErrorResponse | SuccessResponse> {
    try {
      const { amount, branch_id, comment, user_id } = createCashOutDto;

      const cashOut = await this.prisma.cashOut.create({
        data: {
          amount: Number(amount),
          branch_id,
          comment,
          user_id,
        },
      });

      return handleResponse(
        cashOut,
        'Cash Out created successfully',
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
      const all = await this.prisma.cashOut.findMany();
      return handleResponse(
        all,
        'all cash-outs fetched successfully',
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
      const cashOut = await this.prisma.cashOut.findUnique({
        where: {
          id,
        },
      });
      if (!cashOut)
        return handleError('cash in not found', null, HttpStatus.NOT_FOUND);

      return handleResponse(
        cashOut,
        'Cash in fetched successfully',
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
      const cashOut = await this.prisma.cashOut.findUnique({
        where: {
          id,
        },
      });
      if (!cashOut)
        return handleError(
          'Cash out details not found',
          null,
          HttpStatus.NOT_FOUND,
        );

      if (status.toUpperCase() === TransactionStatus.APPROVED) {
        const updatedCashOut = await this.prisma.cashOut.update({
          where: { id },
          data: {
            status: TransactionStatus.APPROVED,
            approved_by,
            approved_at: new Date(),
          },
        });
        return handleResponse(
          updatedCashOut,
          'Cash Out Approved successfully',
          HttpStatus.OK,
        );
      }
      if (status.toUpperCase() === TransactionStatus.REJECTED) {
        const updatedCashOut = await this.prisma.cashOut.update({
          where: { id },
          data: {
            status: TransactionStatus.REJECTED,
            approved_by,
            approved_at: null,
          },
        });
        return handleResponse(
          updatedCashOut,
          'Cash Out Rejected',
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
    updateCashOutDto: UpdateCashOutDto,
  ): Promise<ErrorResponse | SuccessResponse> {
    try {
      const { amount, branch_id, comment, user_id } = updateCashOutDto;
      const cashOut = await this.prisma.cashOut.findUnique({
        where: {
          id,
        },
      });
      if (!cashOut)
        return handleError('cash out not found', null, HttpStatus.NOT_FOUND);

      if (cashOut.status === TransactionStatus.APPROVED)
        return handleError(
          `Cash Out APPROVED, cannot be edited`,
          null,
          HttpStatus.NOT_ACCEPTABLE,
        );

      const updatedCashOut = await this.prisma.cashOut.update({
        where: {
          id,
        },
        data: {
          amount: amount ? Number(amount) : cashOut.amount,
          branch_id: branch_id ? branch_id : cashOut.branch_id,
          comment: comment ? comment : cashOut.comment,
          user_id: user_id ? user_id : cashOut.user_id,
        },
      });

      return handleResponse(
        updatedCashOut,
        'Cash Out updated successfully',
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
      const cashOut = await this.prisma.cashOut.findUnique({
        where: {
          id,
        },
      });
      if (!cashOut)
        return handleError('cash out not found', null, HttpStatus.NOT_FOUND);

      await this.prisma.cashOut.delete({
        where: { id },
      });
      return handleResponse(
        null,
        'Cash Out deleted Successfully',
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
