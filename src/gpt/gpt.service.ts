import * as path from 'path'
import * as fs from 'fs'

import {Injectable, NotFoundException} from '@nestjs/common'
import {
  audioToTextUseCase,
  imageGenerationUseCase,
  orthographyCheckUseCase,
  prosConsDiscusserStreamUseCase,
  prosConsDiscusserUseCase,
  textToAudioUseCase,
  translateUseCase
} from './use-cases'
import {
  AudioToTextDTO,
  ImageGenerationDTO,
  OrtographyDTO,
  ProsConsDiscusserDTO,
  TextToAudioDTO,
  TranslateDTO
} from './dtos'
import OpenAI from 'openai'

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_LEY
  })

  async orthographyCheck(orthographyDTO: OrtographyDTO) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDTO.prompt
    })
  }

  async prosConsDiscusser(prosConsDiscusser: ProsConsDiscusserDTO) {
    return await prosConsDiscusserUseCase(this.openai, {
      prompt: prosConsDiscusser.prompt
    })
  }

  async prosConsDiscusserStream(prosConsDiscusser: ProsConsDiscusserDTO) {
    return await prosConsDiscusserStreamUseCase(this.openai, {
      prompt: prosConsDiscusser.prompt
    })
  }

  async translate(translate: TranslateDTO) {
    return await translateUseCase(this.openai, {
      prompt: translate.prompt,
      lang: translate.lang
    })
  }

  async textToAudio({prompt, voice}: TextToAudioDTO) {
    return await textToAudioUseCase(this.openai, {prompt, voice})
  }

  async textToAudioGetter(fileId: string) {
    const filePath = path.resolve(
      __dirname,
      '../../generated/audios/',
      `${fileId}.mp3`
    )
    const wasFound = fs.existsSync(filePath)
    if (!wasFound) throw new NotFoundException(`File ${fileId} not found`)
    return filePath
  }

  async audioToText(
    audioFile: Express.Multer.File,
    audioToTextDTO: AudioToTextDTO
  ) {
    const {prompt} = audioToTextDTO
    return await audioToTextUseCase(this.openai, {audioFile, prompt})
  }

  async imageGeneration(imageGenerationDTO: ImageGenerationDTO) {
    return imageGenerationUseCase(this.openai, {...imageGenerationDTO})
  }

  async getGeneratedImage(fileId: string) {
    const filePath = path.resolve(
      __dirname,
      '../../generated/audios/',
      `${fileId}.mp3`
    )
    const wasFound = fs.existsSync(filePath)
    if (!wasFound) throw new NotFoundException(`File ${fileId} not found`)
    return filePath
  }
}
