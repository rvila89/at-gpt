"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtGptChatService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("@langchain/openai");
const sql_db_1 = require("langchain/sql_db");
const sql_1 = require("langchain/agents/toolkits/sql");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const prompt_1 = require("./constants/prompt");
let AtGptChatService = class AtGptChatService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async onModuleInit() {
        const sqliteDb = await sql_db_1.SqlDatabase.fromDataSourceParams({
            appDataSource: this.dataSource
        });
        const llm = new openai_1.ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            temperature: 0,
            modelName: 'gpt-4o'
        });
        const dbtoolkit = new sql_1.SqlToolkit(sqliteDb, llm);
        this.agentExecutor = (0, sql_1.createSqlAgent)(llm, dbtoolkit, {
            topK: 20,
            prefix: prompt_1.SQL_PREFIX,
            suffix: prompt_1.SQL_SUFFIX
        });
    }
    async chat(prompt) {
        try {
            const resultDB = await this.agentExecutor.invoke({ input: prompt });
            console.log('resultDB', resultDB);
            console.log(`Got intermediate steps ${JSON.stringify(resultDB.intermediateSteps, null, 2)}`);
            return resultDB.output;
        }
        catch (error) {
            console.log('agent-error', error);
            throw error;
        }
    }
};
exports.AtGptChatService = AtGptChatService;
exports.AtGptChatService = AtGptChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)('default')),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AtGptChatService);
//# sourceMappingURL=at-gpt-chat.service.js.map