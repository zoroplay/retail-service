import { PartialType } from '@nestjs/swagger';
import { CreateCashOutDto } from './create-cash-out.dto';

export class UpdateCashOutDto extends PartialType(CreateCashOutDto) {}
