import { Test, TestingModule } from '@nestjs/testing';
import { RequestDemoController } from './request-demo.controller';
import { RequestDemoService } from './request-demo.service';

describe('RequestDemoController', () => {
  let requestDemoController: RequestDemoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RequestDemoController],
      providers: [RequestDemoService],
    }).compile();

    requestDemoController = app.get<RequestDemoController>(RequestDemoController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(requestDemoController.getHello()).toBe('Hello World!');
    });
  });
});
