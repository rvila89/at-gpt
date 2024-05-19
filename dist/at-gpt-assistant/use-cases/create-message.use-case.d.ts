import OpenAI from 'openai';
interface Options {
    threadId: string;
    question: string;
}
export declare const createMessageUseCase: (openai: OpenAI, options: Options) => Promise<OpenAI.Beta.Threads.Messages.ThreadMessage>;
export {};
