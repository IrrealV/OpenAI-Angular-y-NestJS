import OpenAI from 'openai';
interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  { prompt }: Options
) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        Serás proporcionado con textos en español que pueden contener errores ortográficos y gramaticales.
        Las palabras usadas deben de existir en el dirccionario de la Real Academia Española.
        Debes procesar estos textos y responder en formato JSON. 
        Tu tarea consiste en identificar y corregir los errores presentes y proporcionar información detallada sobre las correcciones realizadas. 
        Además, debes calcular y devolver un porcentaje de acierto, este porcentaje es siempre sobre 100, a más errores tenga en cada palabra, menos puntuación tendrá.

        Si no se encuentran errores en el texto, debes retornar un mensaje de felicitación al usuario.


        Ejemplo de salida: 
        {
        userScore: number
        errors: string[], // ['error -> solución']
        message: string, // Usa emojis y texto para felicitar al usuario
        }

          `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4o',
    temperature: 0.3,
    max_tokens: 150,
    response_format: {
      type: 'json_object',
    },
  });

  /* console.log(completion.choices); */

  const jsonResponse = JSON.parse(completion.choices[0].message.content);

  return jsonResponse;
};
