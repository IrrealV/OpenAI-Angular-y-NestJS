import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-gpt-message-editable-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gptMessageEditableImage.component.html',
  styleUrl: './gptMessageEditableImage.component.css',
})
export class GptMessageEditableImageComponent implements AfterViewInit {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) imageInfo!: { url: string; alt: string };

  @ViewChild('canvas') canvasElement?: ElementRef<HTMLCanvasElement>;

  @Output() onSelectedImage = new EventEmitter<string>();

  public originalImage = signal<HTMLImageElement | null>(null);
  public isDrawing = signal(false);
  public coords = signal({ x: 0, y: 0 });

  private canvas!: HTMLCanvasElement;
  private canvasBounding!: DOMRect;

  ngAfterViewInit(): void {
    if (!this.canvasElement?.nativeElement) return;

    this.canvas = this.canvasElement.nativeElement;
    this.canvasBounding = this.canvas.getBoundingClientRect();

    const ctx = this.canvas.getContext('2d');

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = this.imageInfo.url;

    this.originalImage.set(image);

    image.onload = () => {
      ctx?.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    };
  }

  public onMouseDown(event: MouseEvent) {
    if (!this.canvas) return;
    this.isDrawing.set(true);

    //Obtener las coordenadas del mouse relativo al canvas
    const startX = event.clientX - this.canvasBounding.left;
    const startY = event.clientY - this.canvasBounding.top;

    // Estos valores son mis coordenadas
    //console.log({ startX, startY });

    this.coords.set({ x: startX, y: startY });
  }

  public onMouseMove(event: MouseEvent) {
    if (!this.isDrawing()) return;
    if (!this.canvasElement?.nativeElement) return;

    const currentX = event.clientX - this.canvasBounding.left;
    const currentY = event.clientY - this.canvasBounding.top;

    //Calcular alto y ancho de un rectangulo
    const width = currentX - this.coords().x;
    const height = currentY - this.coords().y;

    const canvasWidht = this.canvas.width;
    const canvasHeight = this.canvas.height;

    //Todo: Limpiar el canvas

    const ctx = this.canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvasWidht, canvasHeight);
    ctx.drawImage(this.originalImage()!, 0, 0, canvasWidht, canvasHeight);

    ctx.clearRect(this.coords().x, this.coords().y, width, height);
  }

  public onMouseUp() {
    this.isDrawing.set(false);

    const url = this.canvas.toDataURL('image/png');

    this.onSelectedImage.emit(url);
  }

  public handleClick() {
    this.onSelectedImage.emit(this.imageInfo.url);
  }
}
