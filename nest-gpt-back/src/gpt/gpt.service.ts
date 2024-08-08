import { Injectable } from '@nestjs/common';
import {
  orthographyCheckUseCase,
  prosConsDiscusserUseCase,
  prosConsDiscusserStreamUseCase,
} from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  /* Solo va a llamar casos de uso */
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openai, { prompt });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserStreamUseCase(this.openai, { prompt });
  }
}
