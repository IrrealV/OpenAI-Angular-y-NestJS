import { environment } from 'environments/environment';
import { AudioToTextResponse } from '../../../presentation/interfaces/audio-text.response';

export const audioToTextUseCase = async (audioFile: File, prompt?: string) => {
  try {
    const formData = new FormData();
    formData.append('file', audioFile);
    if (prompt) {
      formData.append('prompt', prompt);
    }

    const resp = await fetch(`${environment.backendApi}/audio-to-text`, {
      method: 'POST',
      body: formData,
    });

    const data = (await resp.json()) as AudioToTextResponse;

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
