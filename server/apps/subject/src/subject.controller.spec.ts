import { Test, TestingModule } from '@nestjs/testing';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';

describe('SubjectController', () => {
  let subjectController: SubjectController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SubjectController],
      providers: [SubjectService],
    }).compile();

    subjectController = app.get<SubjectController>(SubjectController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(subjectController.getHello()).toBe('Hello World!');
    });
  });
});
