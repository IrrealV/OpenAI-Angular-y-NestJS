import { IsString } from 'class-validator';
export class TranslateDto {
  @IsString()
  prompt: string; //obligatoria

  @IsString()
  lang: string; //obligatoria
}
