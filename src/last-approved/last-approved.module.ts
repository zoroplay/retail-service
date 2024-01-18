import { Module } from '@nestjs/common';
import { LastApprovedService } from './last-approved.service';
import { LastApprovedController } from './last-approved.controller';

@Module({
  controllers: [LastApprovedController],
  providers: [LastApprovedService]
})
export class LastApprovedModule {}
