import { Test, TestingModule } from '@nestjs/testing';
import { LastApprovedController } from './last-approved.controller';
import { LastApprovedService } from './last-approved.service';

describe('LastApprovedController', () => {
  let controller: LastApprovedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LastApprovedController],
      providers: [LastApprovedService],
    }).compile();

    controller = module.get<LastApprovedController>(LastApprovedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
