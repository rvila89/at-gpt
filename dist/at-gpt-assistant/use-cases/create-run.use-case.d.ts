import OpenAI from 'openai';
interface Options {
    threadId: string;
    assistantId?: string;
}
export declare const createRunUseCase: (openai: OpenAI, options: Options) => Promise<OpenAI.Beta.Threads.Runs.Run>;
export {};
