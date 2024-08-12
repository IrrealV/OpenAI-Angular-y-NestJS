import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  ChatMessageComponent,
  MyMessageComponent,
  TypingLoaderComponent,
  TextMessageBoxEvent,
  TextMessageBoxSelectComponent,
} from '@components/index';
import { Message } from '@interfaces/index';

import { OpenAiService } from 'app/presentation/services/openai.service';

import ISO6391 from 'iso-639-1';
import { languageNamesInSpanish } from 'app/core';
const iso = ISO6391;

interface Options {
  id: string;
  text: string;
}
@Component({
  selector: 'app-translate-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './translateStreamPage.component.html',
  styleUrl: './translateStreamPage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent implements OnInit {
  public languages = signal<Options[]>([]);
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);
  public abortSignal = new AbortController();

  ngOnInit(): void {
    this.languages.set(this.getAllLanguages());
  }

  async handleMessageWithSelect({
    prompt,
    selectedOption,
  }: TextMessageBoxEvent) {
    this.abortSignal.abort();
    this.abortSignal = new AbortController();

    this.messages.update((prev) => [
      ...prev,
      { text: prompt, isGpt: false },
      { isGpt: true, text: '' },
    ]);

    this.isLoading.set(true);
    const stream = this.openAiService.translateStream(
      prompt,
      selectedOption,
      this.abortSignal.signal
    );
    this.isLoading.set(false);
    for await (const text of stream) {
      this.handleStreamResponse(text);
    }
  }

  handleStreamResponse(message: string) {
    this.messages().pop();
    const messages = this.messages();

    this.messages.set([...messages, { isGpt: true, text: message }]);
  }

  getAllLanguages(): Options[] {
    return iso.getAllCodes().map((code) => ({
      id: code,
      text: languageNamesInSpanish[code] || iso.getName(code),
    }));
  }
}
