import OpenAI from 'openai';
interface Options {
    prompt: string;
}
export declare const prosConsDiscusserUseCase: (openai: OpenAI, options: Options) => Promise<OpenAI.Chat.Completions.ChatCompletionMessage>;
export {};
