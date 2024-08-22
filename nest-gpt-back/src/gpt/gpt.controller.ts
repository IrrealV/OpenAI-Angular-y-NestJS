import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GptService } from './gpt.service';
import {
  AudioToTextDto,
  ImageGenerationDto,
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';
import type { Response } from 'express';
import { diskStorage } from 'multer';

import { FileInterceptor } from '@nestjs/platform-express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() orthographyDto: OrthographyDto) {
    return this.gptService.orthographyCheck(orthographyDto);
  }

  @Post('pros-cons-discusser')
  prosConsDicusser(@Body() prosConsDiscusserDto: ProsConsDiscusserDto) {
    return this.gptService.prosConsDicusser(prosConsDiscusserDto);
  }

  @Post('translate')
  translate(@Body() translateDto: TranslateDto) {
    return this.gptService.translate(translateDto);
  }

  @Post('text-to-audio')
  async textToAudio(
    @Body() textToAudioDto: TextToAudioDto,
    @Res() res: Response
  ) {
    const filepath = await this.gptService.textToAudio(textToAudioDto);

    res.header('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);

    res.sendFile(filepath);
  }

  @Get('text-to-audio/:fileId')
  async textToAudioGetter(
    @Res() res: Response,
    @Param('fileId') fileId: string
  ) {
    const filepath = await this.gptService.textToAudioGetter(fileId);

    res.header('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);

    res.sendFile(filepath);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStream(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
    @Res() response: Response
  ) {
    const stream =
      await this.gptService.prosConsDicusserStream(prosConsDiscusserDto);

    response.setHeader('Content-Type', 'application/json');
    response.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';

      response.write(piece);
    }

    response.end;
  }

  @Post('translate-stream')
  async translateStream(
    @Body() translateDto: TranslateDto,
    @Res() response: Response
  ) {
    const stream = await this.gptService.translateStream(translateDto);

    response.setHeader('Content-Type', 'application/json');
    response.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';

      response.write(piece);
    }

    response.end;
  }

  @Post('audio-to-text')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './generated/uploads',
        filename: (req, file, callback) => {
          const fileExtension = file.originalname.split('.').pop();
          const fileName = `${new Date().getTime()}.${fileExtension}`;

          return callback(null, fileName);
        },
      }),
    })
  )
  async audioToText(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000 * 1024 * 5,
            message: 'File is bigger than 5mb',
          }),
          new FileTypeValidator({ fileType: 'audio/*' }),
        ],
      })
    )
    file: Express.Multer.File,
    @Body() audioToTextDto: AudioToTextDto
  ) {
    return this.gptService.audioToText(file, audioToTextDto);
    // return this.gptService.audioToText(file);
  }

  @Post('image-generation')
  async imageGeneration(@Body() imageGenerationDto: ImageGenerationDto) {
    return await this.gptService.imageGeneration(imageGenerationDto);
  }

  @Get('image-generation/:filename')
  async getGeneratedImage(
    @Res() res: Response,
    @Param('filename') filename: string
  ) {
    const filepath = await this.gptService.getGeneratedImage(filename);

    res.header('Content-Type', 'image/png');
    res.status(HttpStatus.OK);

    res.sendFile(filepath);
  }
}
