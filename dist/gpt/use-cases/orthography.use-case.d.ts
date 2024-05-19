import OpenAI from 'openai';
interface Options {
    prompt: string;
}
export declare const orthographyCheckUseCase: (openai: OpenAI, options: Options) => Promise<any>;
export {};
