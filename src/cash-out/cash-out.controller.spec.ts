import { Test, TestingModule } from '@nestjs/testing';
import { CashOutController } from './cash-out.controller';
import { CashOutService } from './cash-out.service';

describe('CashOutController', () => {
  let controller: CashOutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashOutController],
      providers: [CashOutService],
    }).compile();

    controller = module.get<CashOutController>(CashOutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
