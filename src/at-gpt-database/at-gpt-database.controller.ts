import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import {ApiOperation, ApiTags} from '@nestjs/swagger'
import {AtGptDatabaseService} from './at-gpt-database.service'
import {FileInterceptor} from '@nestjs/platform-express'
import {diskStorage} from 'multer'
import {Persona} from './entities/persona.entity'
import type {Response} from 'express'
import {join} from 'path'
import * as fs from 'fs'

@ApiTags('AI')
@Controller('at-gpt')
export class AtGptDatabaseController {
  constructor(private readonly atGptDatabaseService: AtGptDatabaseService) {}

  @Post('upload-pdf')
  @ApiOperation({
    summary: 'Give pdf file, it will extract data and insert into DB'
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(__dirname, '..', 'generated', 'uploads', 'cv')
          console.log('up', uploadPath)
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, {recursive: true})
          }
          cb(null, uploadPath)
        },
        filename: (req, file, callback) => {
          callback(null, `${file.originalname}`)
        }
      })
    })
  )
  async uploadPdf(@UploadedFile() file: Express.Multer.File) {
    console.log('f', file)
    return this.atGptDatabaseService.uploadFile(file)
  }
  /*
  To deploy in vercel

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join('/tmp', 'generated', 'uploads', 'cv')
          fs.mkdirSync(uploadPath, {recursive: true})
          cb(null, uploadPath)
        },
        filename: (req, file, callback) => {
          callback(null, `${file.originalname}`)
        }
      })
    })
  )
  */

  @Get('personas')
  async findAll(): Promise<Persona[]> {
    return this.atGptDatabaseService.findAllPeople()
  }

  @Get('personas/:idPersona')
  async generatePdf(
    @Res() res: Response,
    @Param('idPersona') idPersona: string
  ) {
    const pdfBuffer = await this.atGptDatabaseService.generatePdf(
      Number(idPersona)
    )
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=cv.pdf',
      'Content-Length': pdfBuffer.length
    })
    res.end(pdfBuffer)
  }
}
