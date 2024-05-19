import OpenAI from 'openai';
interface Options {
    threadId: string;
}
export declare const getMessageListUseCase: (openai: OpenAI, options: Options) => Promise<{
    role: "user" | "assistant";
    content: any[];
}[]>;
export {};
