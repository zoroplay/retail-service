import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CashOutService } from './cash-out.service';
import { CreateCashOutDto } from './dto/create-cash-out.dto';
import { UpdateCashOutDto } from './dto/update-cash-out.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateCashOutResponseDto } from './dto/create-cash-out-response.dto';
import { DeleteResponseDto } from './dto/delete-response.dto';
import { ApproveDto } from './dto/approve-response.dto';

@ApiTags('Cash Out APIs')
@Controller('cash-out')
export class CashOutController {
  constructor(private readonly cashOutService: CashOutService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateCashOutResponseDto })
  create(
    @Body() createCashOutDto: CreateCashOutDto,
  ): Promise<CreateCashOutResponseDto> {
    return this.cashOutService.create(createCashOutDto);
  }

  @Get()
  @ApiCreatedResponse({ type: CreateCashOutResponseDto })
  findAll(): Promise<CreateCashOutResponseDto> {
    return this.cashOutService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: CreateCashOutResponseDto })
  findOne(@Param('id') id: string): Promise<CreateCashOutResponseDto> {
    return this.cashOutService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: CreateCashOutResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateCashOutDto: UpdateCashOutDto,
  ): Promise<CreateCashOutResponseDto> {
    return this.cashOutService.update(id, updateCashOutDto);
  }
  @Patch('approve/:id')
  @ApiCreatedResponse({ type: CreateCashOutResponseDto })
  approve(
    @Param('id') id: string,
    @Body() updateCashOutDto: ApproveDto,
  ): Promise<CreateCashOutResponseDto> {
    return this.cashOutService.approve(id, updateCashOutDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: DeleteResponseDto })
  remove(@Param('id') id: string): Promise<DeleteResponseDto> {
    return this.cashOutService.remove(id);
  }
}
