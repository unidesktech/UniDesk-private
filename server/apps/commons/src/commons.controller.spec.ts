import { Test, TestingModule } from '@nestjs/testing';
import { CommonsController } from './commons.controller';
import { CommonsService } from './commons.service';

describe('CommonsController', () => {
  let commonsController: CommonsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CommonsController],
      providers: [CommonsService],
    }).compile();

    commonsController = app.get<CommonsController>(CommonsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(commonsController.getHello()).toBe('Hello World!');
    });
  });
});
