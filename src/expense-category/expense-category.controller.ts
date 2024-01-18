import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpenseCategoryService } from './expense-category.service';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResponseDto } from './dto/delete-response.dto';
import { ExpenseCategoryResponseDto } from './dto/expense-category-response.dto';

@ApiTags('Expense Category APIs')
@Controller('expense-category')
export class ExpenseCategoryController {
  constructor(
    private readonly expenseCategoryService: ExpenseCategoryService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: ExpenseCategoryResponseDto })
  create(
    @Body() createExpenseCategoryDto: CreateExpenseCategoryDto,
  ): Promise<ExpenseCategoryResponseDto> {
    return this.expenseCategoryService.create(createExpenseCategoryDto);
  }

  @Get()
  @ApiCreatedResponse({ type: ExpenseCategoryResponseDto })
  findAll(): Promise<ExpenseCategoryResponseDto> {
    return this.expenseCategoryService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ExpenseCategoryResponseDto })
  findOne(@Param('id') id: string): Promise<ExpenseCategoryResponseDto> {
    return this.expenseCategoryService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ExpenseCategoryResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateExpenseCategoryDto: UpdateExpenseCategoryDto,
  ): Promise<ExpenseCategoryResponseDto> {
    return this.expenseCategoryService.update(id, updateExpenseCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResponseDto> {
    return this.expenseCategoryService.remove(id);
  }
}
