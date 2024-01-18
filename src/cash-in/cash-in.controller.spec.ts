import { Test, TestingModule } from '@nestjs/testing';
import { CashInController } from './cash-in.controller';
import { CashInService } from './cash-in.service';

describe('CashInController', () => {
  let controller: CashInController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashInController],
      providers: [CashInService],
    }).compile();

    controller = module.get<CashInController>(CashInController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
