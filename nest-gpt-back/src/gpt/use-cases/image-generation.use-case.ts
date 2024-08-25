import OpenAI from 'openai';
import { downloadImageAsPng } from 'src/helpers';
import * as fs from 'fs';

interface Options {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}
export const imageGenerationUseCase = async (
  openai: OpenAI,
  options: Options
) => {
  const { prompt, originalImage, maskImage } = options;

  //TODO: verificar imagen original
  if (!originalImage || !maskImage) {
    const response = await openai.images.generate({
      prompt: prompt,
      model: 'dall-e-3',
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      response_format: 'url',
    });

    //TODO: Guardar imagen en FS.

    const fileName = downloadImageAsPng(response.data[0].url);
    const url = `${process.env.SERVER_URL}/gpt/gpt/image-generation/${fileName}`;

    return {
      url: url,
      openAiUrl: response.data[0].url,
      revised_prompt: response.data[0].revised_prompt,
    };
  }
  //originalImage= http://localhost:3000/gpt/image-generation/1724579399463.png
  //maskImage = Base64; asdfasdfadfSDSDFASDFSDFASDFsdfasdfsdf
  const pgnImagePath = await downloadImageAsPng(originalImage);
  const maskPath = await downloadImageAsPng(maskImage);

  const response = await openai.images.edit({
    model: 'dall-e-3',
    prompt: prompt,
    image: fs.createReadStream(pgnImagePath),
    mask: fs.createReadStream(maskPath),
    n: 1,
    size: '1024x1024',
    response_format: 'url',
  });

  const fileName = downloadImageAsPng(response.data[0].url);
  const url = `${process.env.SERVER_URL}/gpt/gpt/image-generation/${fileName}`;
  return {
    url: url,
    openAiUrl: response.data[0].url,
    revised_prompt: response.data[0].revised_prompt,
  };
};
