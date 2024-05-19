import OpenAI from 'openai';
export declare const createThreadUseCase: (openai: OpenAI) => Promise<{
    id: string;
}>;
