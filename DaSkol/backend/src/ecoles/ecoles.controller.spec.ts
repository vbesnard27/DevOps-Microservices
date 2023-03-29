import { Test, TestingModule } from '@nestjs/testing';
import { EcolesController } from './ecoles.controller';

describe('EcolesController', () => {
  let controller: EcolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EcolesController],
    }).compile();

    controller = module.get<EcolesController>(EcolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
