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
  templateUrl: './translatePage.component.html',
  styleUrl: './translatePage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent implements OnInit {
  public languages = signal<Options[]>([]);
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  ngOnInit(): void {
    this.languages.set(this.getAllLanguages());
  }

  handleMessageWithSelect({ prompt, selectedOption }: TextMessageBoxEvent) {
    this.isLoading.set(true);

    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);

    this.openAiService
      .translate(prompt, selectedOption)
      .subscribe(({ message }) => {
        this.isLoading.set(false);
        this.messages.update((prev) => [
          ...prev,
          { text: message, isGpt: true },
        ]);
      });
  }

  getAllLanguages(): Options[] {
    return iso.getAllCodes().map((code) => ({
      id: code,
      text: languageNamesInSpanish[code] || iso.getName(code),
    }));
  }
}
