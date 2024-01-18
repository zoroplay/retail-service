import { Test, TestingModule } from '@nestjs/testing';
import { CashInService } from './cash-in.service';

describe('CashInService', () => {
  let service: CashInService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CashInService],
    }).compile();

    service = module.get<CashInService>(CashInService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
