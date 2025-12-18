import { Test, TestingModule } from '@nestjs/testing';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';

describe('FaqController', () => {
  let faqController: FaqController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FaqController],
      providers: [FaqService],
    }).compile();

    faqController = app.get<FaqController>(FaqController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(faqController.getHello()).toBe('Hello World!');
    });
  });
});
