import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpenseTypeService } from './expense-type.service';
import { CreateExpenseTypeDto } from './dto/create-expense-type.dto';
import { UpdateExpenseTypeDto } from './dto/update-expense-type.dto';
import { CreateExpenseTypeResponseDto } from './dto/create-expense-type-response.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApproveDto } from './dto/approve-response.dto';

@ApiTags('Expense Type APIs')
@Controller('expense-type')
export class ExpenseTypeController {
  constructor(private readonly expenseTypeService: ExpenseTypeService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateExpenseTypeResponseDto })
  create(
    @Body() createExpenseTypeDto: CreateExpenseTypeDto,
  ): Promise<CreateExpenseTypeResponseDto> {
    return this.expenseTypeService.create(createExpenseTypeDto);
  }

  @Get()
  @ApiCreatedResponse({ type: CreateExpenseTypeResponseDto })
  findAll(): Promise<CreateExpenseTypeResponseDto> {
    return this.expenseTypeService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: CreateExpenseTypeResponseDto })
  findOne(@Param('id') id: string): Promise<CreateExpenseTypeResponseDto> {
    return this.expenseTypeService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: CreateExpenseTypeResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateExpenseTypeDto: UpdateExpenseTypeDto,
  ): Promise<CreateExpenseTypeResponseDto> {
    return this.expenseTypeService.update(id, updateExpenseTypeDto);
  }
  @Patch('approve/:id')
  @ApiCreatedResponse({ type: CreateExpenseTypeResponseDto })
  approve(
    @Param('id') id: string,
    @Body() updateExpenseTypeDto: ApproveDto,
  ): Promise<CreateExpenseTypeResponseDto> {
    return this.expenseTypeService.approve(id, updateExpenseTypeDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: CreateExpenseTypeResponseDto })
  remove(@Param('id') id: string): Promise<CreateExpenseTypeResponseDto> {
    return this.expenseTypeService.remove(id);
  }
}
