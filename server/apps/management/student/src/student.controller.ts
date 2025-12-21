import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // @Get()
  // getHello(): string {
  //   return this.studentService.getHello();
  // }
  @Post('/save')
  save(@Body() body:any) {
    return this.studentService.save(body)
  }

}
