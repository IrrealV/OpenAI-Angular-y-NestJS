import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-audio-to-text-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audioToTextPage.component.html',
  styleUrl: './audioToTextPage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent {}
