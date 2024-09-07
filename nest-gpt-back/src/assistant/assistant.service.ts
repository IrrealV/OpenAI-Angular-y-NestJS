import { Injectable } from '@nestjs/common';

import OpenAI from 'openai';
import {
  createMessageUseCase,
  createRunUseCase,
  createThreadUseCase,
} from './use-cases';
import { QuestionDto } from './dtos/question.dt';

@Injectable()
export class AssistantService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async createThread() {
    return await createThreadUseCase(this.openai);
  }

  async userQuestion(quesitonDto: QuestionDto) {
    const { threadId, question } = quesitonDto;

    const message = await createMessageUseCase(this.openai, {
      threadId,
      question,
    });

    console.log({ message });

    const run = await createRunUseCase(this.openai, { threadId });
  }
}