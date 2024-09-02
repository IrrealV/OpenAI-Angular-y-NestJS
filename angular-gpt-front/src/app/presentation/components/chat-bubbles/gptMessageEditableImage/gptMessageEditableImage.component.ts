import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-gpt-message-editable-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gptMessageEditableImage.component.html',
  styleUrl: './gptMessageEditableImage.component.css',
})
export class GptMessageEditableImageComponent {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) imageInfo!: { url: string; alt: string };

  @Output() onSelectedImage = new EventEmitter<string>();

  handleClick() {
    this.onSelectedImage.emit(this.imageInfo.url);
  }
}
