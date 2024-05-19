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
exports.LangchainChatService = void 0;
const path = require("path");
const fs = require("fs");
const common_1 = require("@nestjs/common");
const openai_1 = require("@langchain/openai");
const sql_db_1 = require("langchain/sql_db");
const sql_1 = require("langchain/agents/toolkits/sql");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const prompt_1 = require("./constants/prompt");
const openai_2 = require("openai");
const open_ai_use_case_1 = require("./use-cases/open-ai-use-case");
const pdf_1 = require("langchain/document_loaders/fs/pdf");
const prompts_1 = require("@langchain/core/prompts");
const zod_1 = require("zod");
let LangchainChatService = class LangchainChatService {
    constructor(sqliteDataSource) {
        this.sqliteDataSource = sqliteDataSource;
        this.openai = new openai_2.default({
            apiKey: process.env.OPENAI_API_KEY
        });
    }
    async onModuleInit() {
        const sqliteDb = await sql_db_1.SqlDatabase.fromDataSourceParams({
            appDataSource: this.sqliteDataSource
        });
        this.llm = new openai_1.ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            temperature: 0,
            modelName: 'gpt-4o'
        });
        this.toolkit = new sql_1.SqlToolkit(sqliteDb, this.llm);
        this.agent_db_executor = (0, sql_1.createSqlAgent)(this.llm, this.toolkit, {
            topK: 20,
            prefix: prompt_1.SQL_PREFIX,
            suffix: prompt_1.SQL_SUFFIX
        });
    }
    async chat(prompt) {
        try {
            const resultDB = await this.agent_db_executor.invoke({ input: prompt });
            console.log('resultDB', resultDB);
            if (resultDB.output === 'false') {
                return await (0, open_ai_use_case_1.openAiUseCase)(this.openai, prompt);
            }
            else
                return resultDB.output;
        }
        catch (error) {
            console.log('agent-error', error);
            throw error;
        }
    }
    async uploadFile(file) {
        const filePath = path.resolve(__dirname, '../../../generated/uploads/', `${file.filename}`);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException('File does not exist.');
        }
        const loader = new pdf_1.PDFLoader(filePath, {
            splitPages: false
        });
        const docs = await loader.load();
        if (docs.length === 0) {
            console.log('No documents found');
            return;
        }
        const SYSTEM_PROMPT_TEMPLATE = prompt_1.SYSTEM_PROMPT_TEMPLATE_BASE.replace('{{pdfURL}}', filePath);
        const prompt = prompts_1.ChatPromptTemplate.fromMessages([
            ['system', SYSTEM_PROMPT_TEMPLATE],
            ['human', '{text}']
        ]);
        const personSchema = zod_1.z
            .object({
            name: zod_1.z.string().optional().describe('The name of the person'),
            lastName: zod_1.z.string().optional().describe('The last name of the person'),
            email: zod_1.z.string().optional().describe('Email address'),
            phone: zod_1.z.string().optional().describe('Phone number'),
            company: zod_1.z
                .string()
                .optional()
                .describe('The company where the person currently works'),
            summary: zod_1.z
                .string()
                .optional()
                .describe('A brief summary about the person. Use executive brief of cv information'),
            professional_experience: zod_1.z
                .array(zod_1.z.object({
                position: zod_1.z.string().describe('Position held'),
                company: zod_1.z.string().describe('Company name'),
                dateStart: zod_1.z
                    .string()
                    .optional()
                    .describe('Start date of employment'),
                dateEnd: zod_1.z.string().optional().describe('End date of employment'),
                client: zod_1.z.string().optional().describe('Client name'),
                projects: zod_1.z
                    .array(zod_1.z.object({
                    name: zod_1.z.string().describe('Project name'),
                    description: zod_1.z
                        .string()
                        .optional()
                        .describe('Project description'),
                    date: zod_1.z.string().optional().describe('Working period'),
                    technologies_tools: zod_1.z
                        .array(zod_1.z.string())
                        .optional()
                        .describe('Technologies and tools used')
                }))
                    .optional()
                    .describe('Projects involved'),
                skills: zod_1.z
                    .array(zod_1.z.string())
                    .optional()
                    .describe('List of responsibilities'),
                methodology: zod_1.z
                    .array(zod_1.z.string())
                    .optional()
                    .describe('Methodologies followed')
            }))
                .optional()
                .describe('Professional experience'),
            education: zod_1.z
                .array(zod_1.z.object({
                degree: zod_1.z.string().describe('The degree obtained'),
                institution: zod_1.z.string().describe('The institution name'),
                year: zod_1.z.string().optional().describe('Year of graduation')
            }))
                .optional()
                .describe('Educational background'),
            languages: zod_1.z
                .array(zod_1.z.object({
                name: zod_1.z.string().describe('Language name'),
                level: zod_1.z.string().describe('Proficiency level')
            }))
                .optional()
                .describe('Language proficiencies'),
            skills: zod_1.z
                .object({
                technical: zod_1.z
                    .array(zod_1.z.string())
                    .optional()
                    .describe('Technical skills'),
                soft: zod_1.z.array(zod_1.z.string()).optional().describe('Soft skills. ')
            })
                .optional()
                .describe('Skills. Use COMPUTER KNOWLEDGE of CV information')
        })
            .describe('Comprehensive CV Information');
        const extractionRunnable = prompt.pipe(this.llm.withStructuredOutput(personSchema));
        const extract = await extractionRunnable.invoke({
            text: docs[0].pageContent
        });
        console.log(JSON.stringify(extract, null, 2));
        console.log('Successfully extracted');
        return extract;
    }
};
exports.LangchainChatService = LangchainChatService;
exports.LangchainChatService = LangchainChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectDataSource)('sqlite')),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], LangchainChatService);
//# sourceMappingURL=langchain-chat.service.js.map