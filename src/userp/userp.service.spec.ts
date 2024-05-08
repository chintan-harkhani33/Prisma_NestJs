import { Test, TestingModule } from '@nestjs/testing';
import { UserpService } from './userp.service';

describe('UserpService', () => {
  let service: UserpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserpService],
    }).compile();

    service = module.get<UserpService>(UserpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
