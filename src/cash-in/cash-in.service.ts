import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCashInDto } from './dto/create-cash-in.dto';
import { UpdateCashInDto } from './dto/update-cash-in.dto';
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
export class CashInService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCashInDto: CreateCashInDto,
  ): Promise<ErrorResponse | SuccessResponse> {
    try {
      const { amount, branch_id, comment, user_id } = createCashInDto;

      const cashin = await this.prisma.cashIn.create({
        data: {
          amount: Number(amount),
          branch_id,
          comment,
          user_id,
        },
      });
      return handleResponse(
        cashin,
        'Cash In created successfully',
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
      const all = await this.prisma.cashIn.findMany();
      return handleResponse(
        all,
        'all cash-ins fetched successfully',
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

  async findOne(id: string) {
    try {
      const cashin = await this.prisma.cashIn.findUnique({
        where: {
          id,
        },
      });
      if (!cashin)
        return handleError('cash in not found', null, HttpStatus.NOT_FOUND);

      return handleResponse(
        cashin,
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

  async update(
    id: string,
    updateCashInDto: UpdateCashInDto,
  ): Promise<ErrorResponse | SuccessResponse> {
    try {
      const { amount, branch_id, comment, user_id } = updateCashInDto;
      const cashin = await this.prisma.cashIn.findUnique({
        where: {
          id,
        },
      });
      if (!cashin)
        return handleError('cash in not found', null, HttpStatus.NOT_FOUND);

      if (cashin.status === TransactionStatus.APPROVED)
        return handleError(
          `Cash In APPROVED, cannot be edited`,
          null,
          HttpStatus.NOT_ACCEPTABLE,
        );

      const updatedCashIn = await this.prisma.cashIn.update({
        where: {
          id,
        },
        data: {
          amount: amount ? Number(amount) : cashin.amount,
          branch_id: branch_id ? branch_id : cashin.branch_id,
          comment: comment ? comment : cashin.comment,
          user_id: user_id ? user_id : cashin.user_id,
        },
      });

      return handleResponse(
        updatedCashIn,
        'Cash in updated successfully',
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
      const cashIn = await this.prisma.cashIn.findUnique({
        where: {
          id,
        },
      });
      if (!cashIn)
        return handleError(
          'Cash in details not found',
          null,
          HttpStatus.NOT_FOUND,
        );

      if (status.toUpperCase() === TransactionStatus.APPROVED) {
        const updatedCashIn = await this.prisma.cashIn.update({
          where: { id },
          data: {
            status: TransactionStatus.APPROVED,
            approved_by,
            approved_at: new Date(),
          },
        });
        return handleResponse(
          updatedCashIn,
          'Cash In Approved successfully',
          HttpStatus.OK,
        );
      }
      if (status.toUpperCase() === TransactionStatus.REJECTED) {
        const updatedCashIn = await this.prisma.cashIn.update({
          where: { id },
          data: {
            status: TransactionStatus.REJECTED,
            approved_by,
            approved_at: null,
          },
        });
        return handleResponse(
          updatedCashIn,
          'Cash In successfully',
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
      const cashin = await this.prisma.cashIn.findUnique({
        where: {
          id,
        },
      });
      if (!cashin)
        return handleError('cash in not found', null, HttpStatus.NOT_FOUND);

      await this.prisma.cashIn.delete({
        where: { id },
      });
      return handleResponse(
        null,
        'Cash In deleted Successfully',
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
