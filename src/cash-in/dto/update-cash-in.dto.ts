import { PartialType } from '@nestjs/swagger';
import { CreateCashInDto } from './create-cash-in.dto';

export class UpdateCashInDto extends PartialType(CreateCashInDto) {}
