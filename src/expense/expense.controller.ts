import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateExpenseResponseDto } from './dto/create-expense-response.dto';
import { DeleteResponseDto } from './dto/delete-response.dto';
import { ApproveDto } from './dto/approve-response.dto';

@ApiTags('Expense APIs')
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateExpenseResponseDto })
  create(
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<CreateExpenseResponseDto> {
    return this.expenseService.create(createExpenseDto);
  }

  @Get()
  @ApiCreatedResponse({ type: CreateExpenseResponseDto })
  findAll(): Promise<CreateExpenseResponseDto> {
    return this.expenseService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: CreateExpenseResponseDto })
  findOne(@Param('id') id: string): Promise<CreateExpenseResponseDto> {
    return this.expenseService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: CreateExpenseResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<CreateExpenseResponseDto> {
    return this.expenseService.update(id, updateExpenseDto);
  }
  @Patch('approve/:id')
  @ApiCreatedResponse({ type: CreateExpenseResponseDto })
  approve(
    @Param('id') id: string,
    @Body() updateExpenseDto: ApproveDto,
  ): Promise<CreateExpenseResponseDto> {
    return this.expenseService.approve(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: DeleteResponseDto })
  remove(@Param('id') id: string): Promise<DeleteResponseDto> {
    return this.expenseService.remove(id);
  }
}
