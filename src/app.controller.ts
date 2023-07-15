import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Controller('uploads')
export class AppController {
  @Get(':filename')
  getFile(@Res() res: Response, @Param('filename') fileName: string) {
    res.sendFile(path.join(__dirname, '../uploads/' + fileName));
  }
}
