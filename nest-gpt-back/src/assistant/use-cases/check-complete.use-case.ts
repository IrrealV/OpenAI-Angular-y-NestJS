import OpenAI from 'openai';

interface Options {
  threadId: string;
  runId: string;
}
export const checkCompleteStatusUseCase = async (
  openai: OpenAI,
  options: Options
) => {
  const { threadId, runId } = options;

  const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);

  console.log({ status: runStatus.status }); //Completed

  if (runStatus.status === 'completed') return runStatus;

  //Hay que darle un poco de delay para que openai no me baneen por peticiones excesivas
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return await checkCompleteStatusUseCase(openai, options);
};
