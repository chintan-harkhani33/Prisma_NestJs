import { Test, TestingModule } from '@nestjs/testing';
import { UserpController } from './userp.controller';
import { UserpService } from './userp.service';

describe('UserpController', () => {
  let controller: UserpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserpController],
      providers: [UserpService],
    }).compile();

    controller = module.get<UserpController>(UserpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
