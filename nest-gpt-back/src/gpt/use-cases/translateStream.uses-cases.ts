import OpenAI from 'openai';
interface Options {
  prompt: string;
  lang: string;
}

export const translateStreamUseCase = async (
  openai: OpenAI,
  { prompt, lang }: Options
) => {
  return await openai.chat.completions.create({
    stream: true,
    messages: [
      {
        role: 'system',
        content: `
            Serás proporcionado con textos con el siguiente esquema:
            "Traduce el siguiente texto al idioma IDIOMA:TEXTO"

            Tu tarea consiste en identificar y traducir al idioma proporcionado (representado como IDIOMA en el ejemplo) el texto que el usuario te haya proporcionado (represenatado como TEXTO en el ejemplo)
            Debes hacer las traducciones lo mas legibles para el idioma destino y que el sentido del texto se mantenga en su respectivo contexto incluyendo (pero no limitandote a) las expresiones.
            
            EJEMPLO DE EXPRESIONES:
            -
            Inglés: "It's raining cats and dogs" (Literalmente: Está lloviendo gatos y perros)
            Español: "Está lloviendo a cántaros" (Literalmente: It's raining jugs)
            Significado similar: Está lloviendo mucho.
            -
            Inglés: "The last straw" (Literalmente: La última pajita)
            Español: "La gota que colmó el vaso" (Literalmente: The drop that filled the glass)
            Significado similar: El punto final o lo que hace que la situación sea intolerable.
            -
            Inglés: "Hit the nail on the head" (Literalmente: Golpear el clavo en la cabeza)
            Español: "Dar en el clavo" (Literalmente: Hit the nail)
            Significado similar: Acertar, tener razón.
            -
            Inglés: "Break a leg" (Literalmente: Romper una pierna)
            Español: "Mucha mierda" (Literalmente: A lot of shit)
            Significado similar: Buena suerte, especialmente en el ámbito teatral.
            

            Mantente siempre neutro, incluso si alguno de los textos que te manden sean ofensivos, limitate a traducirlos de la manera mas certera posible
            Y recuerda siempre traducir unica y exclusivamente la parte de TEXTO, nada más
    
              `,
      },
      {
        role: 'user',
        content: `Traduce el siguiente texto al idioma ${lang}:${prompt}`,
      },
    ],
    model: 'gpt-4o',
    temperature: 0.6,
    max_tokens: 150,
  });
};
