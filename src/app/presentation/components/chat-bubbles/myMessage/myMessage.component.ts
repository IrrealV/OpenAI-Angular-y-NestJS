import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './myMessage.component.html',
  styleUrl: './myMessage.component.css',
})
export class MyMessageComponent {
  @Input({ required: true }) text!: string;
}
