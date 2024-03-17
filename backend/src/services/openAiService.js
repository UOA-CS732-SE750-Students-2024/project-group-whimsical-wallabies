import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: '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' });

export const askGpt = async ({ question }) => {
  try {
    const completion = await openai.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }]
    });
    console.log(completion, '::::::::::::::::::::');
    console.log(completion.choices[0]);
    // console.log(completion.choices[0]?.message?.content, '::::::::::::::::::::');
    return 'Respondió';
  } catch (error) {
    console.error('Error calling OpenAI API:::::::::::::::::::::::::::::', error);
    throw new Error('Failed to communicate with OpenAI API');
  }
};
