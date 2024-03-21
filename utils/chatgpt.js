import { Configuration, OpenAIApi } from 'openai';

const openAIConfig = new Configuration({ apiKey: process.env.CHATGPT_API_KEY });
const openai = new OpenAIApi(openAIConfig);

export async function translate(value, language) {
    const completion = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [
            {
                role: 'user',
                content: `translate to ${language}: ${value}`
            }
        ]
    });
    // console.log('gpt response', completion.data.choices);
    return completion.data.choices[0].message.content;
}

export async function generateTopic(topic, sentenceCount) {
    const completion = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [
            {
                role: 'user',
                content: `generate ${sentenceCount} sentences on ${topic} topic`
            }
        ]
    });
    // console.log('gpt response', completion.data.choices);
    return completion.data.choices[0].message.content;
}
