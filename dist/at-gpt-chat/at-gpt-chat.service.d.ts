import { OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
export declare class AtGptChatService implements OnModuleInit {
    private dataSource;
    private agentExecutor;
    constructor(dataSource: DataSource);
    onModuleInit(): Promise<void>;
    chat(prompt: string): Promise<any>;
}
