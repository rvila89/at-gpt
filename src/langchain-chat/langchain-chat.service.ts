import * as path from 'path'
import * as fs from 'fs'

import {Injectable, NotFoundException, OnModuleInit} from '@nestjs/common'
import {ChatOpenAI} from '@langchain/openai'
import {SqlDatabase} from 'langchain/sql_db'
import {createSqlAgent, SqlToolkit} from 'langchain/agents/toolkits/sql'
import {DataSource} from 'typeorm'
import {InjectDataSource} from '@nestjs/typeorm'
import {
  SQL_PREFIX,
  SQL_SUFFIX,
  SYSTEM_PROMPT_TEMPLATE_BASE
} from './constants/prompt'
import OpenAI from 'openai'
import {openAiUseCase} from './use-cases/open-ai-use-case'
import {PDFLoader} from 'langchain/document_loaders/fs/pdf'
import {ChatPromptTemplate} from '@langchain/core/prompts'
import {z} from 'zod'

@Injectable()
export class LangchainChatService implements OnModuleInit {
  private agent_db_executor: any
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
  private toolkit: SqlToolkit
  private llm: ChatOpenAI

  constructor(
    @InjectDataSource('sqlite') private sqliteDataSource: DataSource
  ) {}

  async onModuleInit() {
    // Configuración de la base de datos SQLite y el agente de SQL de LangChain
    const sqliteDb = await SqlDatabase.fromDataSourceParams({
      appDataSource: this.sqliteDataSource
    })

    this.llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
      modelName: 'gpt-4o'
    })

    this.toolkit = new SqlToolkit(sqliteDb, this.llm)

    this.agent_db_executor = createSqlAgent(this.llm, this.toolkit, {
      topK: 20,
      prefix: SQL_PREFIX,
      suffix: SQL_SUFFIX
    })
  }

  async chat(prompt: string) {
    try {
      const resultDB = await this.agent_db_executor.invoke({input: prompt})
      console.log('resultDB', resultDB)
      if (resultDB.output === 'false') {
        return await openAiUseCase(this.openai, prompt)
      } else return resultDB.output
    } catch (error) {
      console.log('agent-error', error)
      throw error
    }
  }

  async uploadFile(file: Express.Multer.File) {
    const filePath = path.resolve(
      __dirname,
      '../../../generated/uploads/',
      `${file.filename}`
    )
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File does not exist.')
    }
    const loader = new PDFLoader(filePath, {
      splitPages: false
    })
    const docs = await loader.load()
    if (docs.length === 0) {
      console.log('No documents found')
      return
    }

    const SYSTEM_PROMPT_TEMPLATE = SYSTEM_PROMPT_TEMPLATE_BASE.replace(
      '{{pdfURL}}',
      filePath
    )

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', SYSTEM_PROMPT_TEMPLATE],
      ['human', '{text}']
    ])

    const personSchema = z
      .object({
        name: z.string().optional().describe('The name of the person'),
        lastName: z.string().optional().describe('The last name of the person'),
        email: z.string().optional().describe('Email address'),
        phone: z.string().optional().describe('Phone number'),
        company: z
          .string()
          .optional()
          .describe('The company where the person currently works'),
        summary: z
          .string()
          .optional()
          .describe(
            'A brief summary about the person. Use executive brief of cv information'
          ),
        professional_experience: z
          .array(
            z.object({
              position: z.string().describe('Position held'),
              company: z.string().describe('Company name'),
              dateStart: z
                .string()
                .optional()
                .describe('Start date of employment'),
              dateEnd: z.string().optional().describe('End date of employment'),
              client: z.string().optional().describe('Client name'),
              projects: z
                .array(
                  z.object({
                    name: z.string().describe('Project name'),
                    description: z
                      .string()
                      .optional()
                      .describe('Project description'),
                    date: z.string().optional().describe('Working period'),
                    technologies_tools: z
                      .array(z.string())
                      .optional()
                      .describe('Technologies and tools used')
                  })
                )
                .optional()
                .describe('Projects involved'),
              skills: z
                .array(z.string())
                .optional()
                .describe('List of responsibilities'),
              methodology: z
                .array(z.string())
                .optional()
                .describe('Methodologies followed')
            })
          )
          .optional()
          .describe('Professional experience'),
        education: z
          .array(
            z.object({
              degree: z.string().describe('The degree obtained'),
              institution: z.string().describe('The institution name'),
              year: z.string().optional().describe('Year of graduation')
            })
          )
          .optional()
          .describe('Educational background'),
        languages: z
          .array(
            z.object({
              name: z.string().describe('Language name'),
              level: z.string().describe('Proficiency level')
            })
          )
          .optional()
          .describe('Language proficiencies'),
        skills: z
          .object({
            technical: z
              .array(z.string())
              .optional()
              .describe('Technical skills'),
            soft: z.array(z.string()).optional().describe('Soft skills. ')
          })
          .optional()
          .describe('Skills. Use COMPUTER KNOWLEDGE of CV information')
      })
      .describe('Comprehensive CV Information')

    const extractionRunnable = prompt.pipe(
      this.llm.withStructuredOutput(personSchema)
    )

    const extract = await extractionRunnable.invoke({
      text: docs[0].pageContent
    })

    console.log(JSON.stringify(extract, null, 2))
    console.log('Successfully extracted')

    return extract

    // Modify output as needed
    // return extract
  }
}
