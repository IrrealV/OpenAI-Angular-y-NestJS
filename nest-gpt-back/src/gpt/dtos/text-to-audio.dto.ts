import { IsOptional, IsString } from 'class-validator';
export class TextToAudioDto {
  @IsString()
  prompt: string; //obligatoria

  @IsString()
  @IsOptional()
  readonly voice?: string; //obligatoria
}
