import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-image-generation-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imageGenerationPage.component.html',
  styleUrl: './imageGenerationPage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageGenerationPageComponent {}
