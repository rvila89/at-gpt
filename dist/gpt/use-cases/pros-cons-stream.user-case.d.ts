import OpenAI from 'openai';
interface Options {
    prompt: string;
}
export declare const prosConsDiscusserStreamUseCase: (openai: OpenAI, options: Options) => Promise<import("openai/streaming").Stream<OpenAI.Chat.Completions.ChatCompletionChunk>>;
export {};
