import OpenAI from 'openai'

interface Options {
  threadId: string
  assistantId?: string
}

export const createRunUseCase = async (openai: OpenAI, options: Options) => {
  const {threadId, assistantId = 'asst_qrcAzk5T5dJL2fBy5CFGadAj'} = options

  console.log('threadId', threadId)
  console.log('assistantId', assistantId)

  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId
  })

  console.log(run)
  return run
}
