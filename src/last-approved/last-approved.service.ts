import { Injectable } from '@nestjs/common';
import { CreateLastApprovedDto } from './dto/create-last-approved.dto';
import { UpdateLastApprovedDto } from './dto/update-last-approved.dto';

@Injectable()
export class LastApprovedService {
  async newEntry(createLastApprovedDto: CreateLastApprovedDto) {
    return;
  }
  findAll() {
    return `This action returns all lastApproved`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lastApproved`;
  }

  update(id: number, updateLastApprovedDto: UpdateLastApprovedDto) {
    return `This action updates a #${id} lastApproved`;
  }

  remove(id: number) {
    return `This action removes a #${id} lastApproved`;
  }
}
