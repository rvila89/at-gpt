import * as path from 'path'
import * as fs from 'fs'
import {NotFoundException} from '@nestjs/common'
import {PDFLoader} from 'langchain/document_loaders/fs/pdf'
import {SYSTEM_PROMPT_TEMPLATE_BASE} from '../constants/prompt'
import {ChatPromptTemplate} from '@langchain/core/prompts'
import {personSchema} from '../schema/personSchema'
import {ChatOpenAI} from '@langchain/openai'

export const uploadFileUseCase = async (
  file: Express.Multer.File,
  llm: ChatOpenAI
) => {
  const uploadDir = path.join(__dirname, '..', 'generated', 'uploads', 'cv')
  const filePath = path.join(uploadDir, file.filename)
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

  const extractionRunnable = prompt.pipe(llm.withStructuredOutput(personSchema))

  const extract = await extractionRunnable.invoke({
    text: docs[0].pageContent
  })

  console.log(JSON.stringify(extract, null, 2))
  console.log('Successfully extracted')

  return extract
}
