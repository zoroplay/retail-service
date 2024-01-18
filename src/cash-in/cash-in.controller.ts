import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CashInService } from './cash-in.service';
import { CreateCashInDto } from './dto/create-cash-in.dto';
import { UpdateCashInDto } from './dto/update-cash-in.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateCashInResponseDto } from './dto/create-cash-in-response.dto';
import { DeleteResponseDto } from './dto/delete-response.dto';
import { ApproveDto } from './dto/approve-response.dto';

@ApiTags('Cash In APIs')
@Controller('cash-in')
export class CashInController {
  constructor(private readonly cashInService: CashInService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateCashInResponseDto })
  create(
    @Body() createCashInDto: CreateCashInDto,
  ): Promise<CreateCashInResponseDto> {
    return this.cashInService.create(createCashInDto);
  }

  @Get()
  @ApiCreatedResponse({ type: CreateCashInResponseDto })
  findAll(): Promise<CreateCashInResponseDto> {
    return this.cashInService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: CreateCashInResponseDto })
  findOne(@Param('id') id: string): Promise<CreateCashInResponseDto> {
    return this.cashInService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: CreateCashInResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateCashInDto: UpdateCashInDto,
  ): Promise<CreateCashInResponseDto> {
    return this.cashInService.update(id, updateCashInDto);
  }

  @Patch('approve/:id')
  @ApiCreatedResponse({ type: CreateCashInResponseDto })
  approve(
    @Param('id') id: string,
    @Body() updateCashInDto: ApproveDto,
  ): Promise<CreateCashInResponseDto> {
    return this.cashInService.approve(id, updateCashInDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: DeleteResponseDto })
  remove(@Param('id') id: string): Promise<DeleteResponseDto> {
    return this.cashInService.remove(id);
  }
}
