import { Test, TestingModule } from '@nestjs/testing';
import { ParentController } from './parent.controller';
import { ParentService } from './parent.service';

describe('ParentController', () => {
  let parentController: ParentController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ParentController],
      providers: [ParentService],
    }).compile();

    parentController = app.get<ParentController>(ParentController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(parentController.getHello()).toBe('Hello World!');
    });
  });
});
