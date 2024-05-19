import OpenAI from 'openai';
interface Options {
    prompt: string;
    lang: string;
}
export declare const translateUseCase: (openai: OpenAI, { prompt, lang }: Options) => Promise<{
    message: string;
}>;
export {};
