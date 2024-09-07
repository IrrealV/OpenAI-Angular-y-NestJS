import { environment } from 'environments/environment';

export const createThreadUseCase = async () => {
  try {
    const resp = await fetch(`${environment.assistantApi}/create-thread`, {
      method: 'POST',
    });

    const { id } = (await resp.json()) as { id: string };

    return id;
  } catch (e) {
    throw new Error('Error creando thread ID');
  }
};
