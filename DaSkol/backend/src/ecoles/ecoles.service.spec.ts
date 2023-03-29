import { Test, TestingModule } from '@nestjs/testing';
import { EcolesService } from './ecoles.service';

describe('EcolesService', () => {
  let service: EcolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcolesService],
    }).compile();

    service = module.get<EcolesService>(EcolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
