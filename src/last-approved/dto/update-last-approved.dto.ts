import { PartialType } from '@nestjs/swagger';
import { CreateLastApprovedDto } from './create-last-approved.dto';

export class UpdateLastApprovedDto extends PartialType(CreateLastApprovedDto) {}
