import {Injectable, OnModuleInit} from '@nestjs/common'
import {ChatOpenAI} from '@langchain/openai'
import {SqlDatabase} from 'langchain/sql_db'
import {createSqlAgent, SqlToolkit} from 'langchain/agents/toolkits/sql'
import {DataSource} from 'typeorm'
import {InjectDataSource} from '@nestjs/typeorm'
import {SQL_PREFIX, SQL_SUFFIX} from './constants/prompt'

@Injectable()
export class AtGptChatService implements OnModuleInit {
  private agentExecutor: any

  constructor(@InjectDataSource('default') private dataSource: DataSource) {}

  async onModuleInit() {
    // Configuración de la base de datos SQLite y el agente de SQL de LangChain
    const sqliteDb = await SqlDatabase.fromDataSourceParams({
      appDataSource: this.dataSource
    })
    const llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
      modelName: 'gpt-4o'
    })
    const dbtoolkit = new SqlToolkit(sqliteDb, llm)
    this.agentExecutor = createSqlAgent(llm, dbtoolkit, {
      topK: 20,
      prefix: SQL_PREFIX,
      suffix: SQL_SUFFIX
    })
  }

  async chat(prompt: string) {
    try {
      const resultDB = await this.agentExecutor.invoke({input: prompt})
      console.log('resultDB', resultDB)
      console.log(
        `Got intermediate steps ${JSON.stringify(
          resultDB.intermediateSteps,
          null,
          2
        )}`
      )
      return resultDB.output
    } catch (error) {
      console.log('agent-error', error)
      throw error
    }
  }
}
