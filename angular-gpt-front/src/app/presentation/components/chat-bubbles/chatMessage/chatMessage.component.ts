import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

interface imageOptions {
  url: string;
  alt: string;
}

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './chatMessage.component.html',
  styleUrl: './chatMessage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  @Input({ required: true }) text!: string;

  @Input() audioUrl?: string;

  @Input() imageInfo?: imageOptions;
}
