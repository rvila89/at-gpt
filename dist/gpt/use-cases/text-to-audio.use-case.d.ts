import OpenAI from 'openai';
interface Options {
    prompt: string;
    voice?: string;
}
export declare const textToAudioUseCase: (openai: OpenAI, { prompt, voice }: Options) => Promise<string>;
export {};
