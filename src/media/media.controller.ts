import {
  Controller,
  Get,
  Res,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { file } from 'jszip';
@Controller()
export class MediaController {
  constructor() {}

  @Get('download')
  download(@Res() res) {
    const filename = 'Files.zip';
    return res.download(filename);
  }
}
