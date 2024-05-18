import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import {ApiOperation, ApiTags} from '@nestjs/swagger'
import {LangchainChatService} from './langchain-chat.service'
import {FileInterceptor} from '@nestjs/platform-express'
import {diskStorage} from 'multer'

@ApiTags('AI')
@Controller('at-gpt')
export class LangchainChatController {
  constructor(private readonly langchainChatService: LangchainChatService) {}

  @Get('chat')
  @ApiOperation({
    summary:
      'Give Prompt to the Agent, it will generate and execute SQL on given schema'
  })
  async chat(
    @Query('prompt') prompt: string
  ): Promise<{success: boolean; data?: string; messageError?: string}> {
    try {
      const data = await this.langchainChatService.chat(prompt)
      return {success: true, data}
    } catch (err) {
      return {success: false, messageError: err}
    }
  }

  @Post('upload-pdf')
  @ApiOperation({
    summary: 'Give pdf file, it will extract data and insert into DB'
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './generated/uploads',
        filename: (req, file, callback) => {
          callback(null, `${file.originalname}`)
        }
      })
    })
  )
  async uploadPdf(@UploadedFile() file: Express.Multer.File) {
    return this.langchainChatService.uploadFile(file)
    // const extractedInfo = await processPDF(file.path)
    // // Aquí puedes manejar el objeto JSON como desees, por ejemplo, actualizar tu base de datos SQLite
    // // Por simplicidad, aquí simplemente lo devolvemos
    // return extractedInfo
  }
}
