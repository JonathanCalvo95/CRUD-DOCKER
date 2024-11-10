import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRootMessage() {
    return 'La aplicación está funcionando correctamente';
  }
}
