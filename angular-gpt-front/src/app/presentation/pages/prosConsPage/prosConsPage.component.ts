import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prosConsPage.component.html',
  styleUrl: './prosConsPage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent {}
