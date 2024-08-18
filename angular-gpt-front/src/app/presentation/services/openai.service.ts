import { Injectable } from '@angular/core';
import {
  orthographyUseCase,
  prosConsStreamUseCase,
  prosConsUseCase,
  translateUseCase,
  translateStreamUseCase,
  textToAudioUseCase,
} from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAiService {
  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }

  prosConsDiscusser(prompt: string) {
    return from(prosConsUseCase(prompt));
  }

  prosConsStreamDiscusser(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamUseCase(prompt, abortSignal);
  }

  translate(prompt: string, lang: string) {
    return from(translateUseCase(prompt, lang));
  }

  translateStream(prompt: string, lang: string, abortSignal: AbortSignal) {
    return translateStreamUseCase(prompt, lang, abortSignal);
  }

  textToAudio(prompt: string, voice: string) {
    return from(textToAudioUseCase(prompt, voice));
  }
}
