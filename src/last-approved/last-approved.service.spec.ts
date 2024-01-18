import { Test, TestingModule } from '@nestjs/testing';
import { LastApprovedService } from './last-approved.service';

describe('LastApprovedService', () => {
  let service: LastApprovedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LastApprovedService],
    }).compile();

    service = module.get<LastApprovedService>(LastApprovedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
