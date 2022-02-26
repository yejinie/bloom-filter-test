import { Controller, Get , Param} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  ceate() {
    return this.appService.create();
  }

  @Get(':add')
  check(@Param('add') add:string) {
    return this.appService.check('add');
  }
}
