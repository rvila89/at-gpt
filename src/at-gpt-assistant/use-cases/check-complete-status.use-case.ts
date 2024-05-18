import OpenAI from 'openai'

interface Options {
  threadId: string
  runId: string
}

export const checkCompleteStatusUseCase = async (
  openai: OpenAI,
  options: Options
) => {
  const {threadId, runId} = options

  const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId)
  console.log({runstatus: runStatus.status}) // completed

  if (runStatus.status === 'completed') {
    return runStatus
  } else if (runStatus.status === 'failed') {
    console.log(runStatus.status) // para manejarlo de otra manera
  }

  // Esperar un segundo antes de volver a consultar
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return await checkCompleteStatusUseCase(openai, options)
}
