import OpenAI from 'openai';
interface Options {
    threadId: string;
    runId: string;
}
export declare const checkCompleteStatusUseCase: (openai: OpenAI, options: Options) => any;
export {};
