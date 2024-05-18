import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import {
  AudioToTextDTO,
  ImageGenerationDTO,
  OrtographyDTO,
  ProsConsDiscusserDTO,
  TextToAudioDTO,
  TranslateDTO
} from './dtos'
import type {Response} from 'express'
import {FileInterceptor} from '@nestjs/platform-express'
import {diskStorage} from 'multer'
import {GptService} from './gpt.service'

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() orthograpyDTO: OrtographyDTO) {
    return this.gptService.orthographyCheck(orthograpyDTO)
  }

  @Post('pros-cons-discusser')
  prosConsDiscusser(@Body() prosConsDiscusserDTO: ProsConsDiscusserDTO) {
    return this.gptService.prosConsDiscusser(prosConsDiscusserDTO)
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStream(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDTO,
    @Res() res: Response
  ) {
    const stream =
      await this.gptService.prosConsDiscusserStream(prosConsDiscusserDto)

    res.setHeader('Content-Type', 'application/json')
    res.status(HttpStatus.OK)

    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || ''
      console.log(piece)
      res.write(piece)
    }

    res.end()
  }

  @Post('translate')
  traslate(@Body() translateDTO: TranslateDTO) {
    return this.gptService.translate(translateDTO)
  }

  @Post('text-to-audio')
  async textToAudio(
    @Body() textToAudioDTO: TextToAudioDTO,
    @Res() res: Response
  ) {
    const filePath = await this.gptService.textToAudio(textToAudioDTO)
    res.setHeader('Content-Type', 'audio/mp3')
    res.status(HttpStatus.OK)
    res.sendFile(filePath)
  }

  @Get('text-to-audio/:fileId')
  async textToAudioGetter(
    @Res() res: Response,
    @Param('fileId') fileId: string
  ) {
    const filePath = await this.gptService.textToAudioGetter(fileId)
    res.setHeader('Content-Type', 'audio/mp3')
    res.status(HttpStatus.OK)
    res.sendFile(filePath)
  }

  @Post('audio-to-text')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './generated/uploads',
        filename: (req, file, cb) => {
          const fileExtension = file.originalname.split('.').pop()
          const fileName = `${new Date().getTime()}.${fileExtension}`
          return cb(null, fileName)
        }
      })
    })
  )
  async audioToText(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000 * 1024 * 5,
            message: 'File is bigger than 5 mb'
          }),
          new FileTypeValidator({fileType: 'audio/*'})
        ]
      })
    )
    file: Express.Multer.File,
    @Body() audioToTextDTO: AudioToTextDTO
  ) {
    return this.gptService.audioToText(file, audioToTextDTO)
  }

  @Post('image-generation')
  async imageGeneration(@Body() imageGenerationDTO: ImageGenerationDTO) {
    return await this.gptService.imageGeneration(imageGenerationDTO)
  }

  @Get('image-generation/:fileName')
  async getGeneratedImage(
    @Res() res: Response,
    @Param('fileName') fileName: string
  ) {
    const filePath = await this.gptService.textToAudioGetter(fileName)
    res.setHeader('Content-Type', 'audio/mp3')
    res.status(HttpStatus.OK)
    res.sendFile(filePath)
  }
}
