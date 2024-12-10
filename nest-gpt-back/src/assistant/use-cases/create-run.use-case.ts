import OpenAI from 'openai';

interface Options {
  threadId: string;
  assistantId?: string;
}
export const createRunUseCase = async (openai: OpenAI, options: Options) => {
  const { threadId, assistantId = 'asst_fgsqfzMbhboVikEOEcNTPqOg' } = options;

  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    //instructions: //OJO, Sobreescribe el asistente
  });

  console.log(run);
  return run;
};
