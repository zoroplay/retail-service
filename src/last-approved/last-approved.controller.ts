import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LastApprovedService } from './last-approved.service';
import { CreateLastApprovedDto } from './dto/create-last-approved.dto';
import { UpdateLastApprovedDto } from './dto/update-last-approved.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FetchEntryResponseDto } from './dto/Fetch-Entry-response.dto';

@ApiTags("Last Approved API's")
@Controller('last-approved')
export class LastApprovedController {
  constructor(private readonly lastApprovedService: LastApprovedService) {}

  @Post()
  @ApiOkResponse({ type: FetchEntryResponseDto })
  newEntry(@Body() createLastApprovedDto: CreateLastApprovedDto) {
    return this.lastApprovedService.newEntry(createLastApprovedDto);
  }

  @Get()
  findAll() {
    return this.lastApprovedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lastApprovedService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLastApprovedDto: UpdateLastApprovedDto,
  ) {
    return this.lastApprovedService.update(+id, updateLastApprovedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lastApprovedService.remove(+id);
  }
}
