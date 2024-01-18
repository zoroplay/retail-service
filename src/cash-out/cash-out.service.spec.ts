import { Test, TestingModule } from '@nestjs/testing';
import { CashOutService } from './cash-out.service';

describe('CashOutService', () => {
  let service: CashOutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CashOutService],
    }).compile();

    service = module.get<CashOutService>(CashOutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
