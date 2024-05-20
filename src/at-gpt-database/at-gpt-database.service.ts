import {
  Injectable,
  HttpException,
  HttpStatus,
  OnModuleInit
} from '@nestjs/common'
import {ChatOpenAI} from '@langchain/openai'
import {uploadFileUseCase} from './use-cases/upload-file-use-case'
import {InjectRepository} from '@nestjs/typeorm'
import {Persona} from './entities/persona.entity'
import {Repository} from 'typeorm'
import {createEmployeeUseCase} from './use-cases/create-empoloyee-use-case'
import {assignSkillToPersonUseCase} from './use-cases/assign-skills-use-case'
import {Skill} from './entities/skill.entity'
import {createSkillUseCase} from './use-cases/create-skill-use-case'
import {Idioma} from './entities/idioma.entity'
import {createLanguageUseCase} from './use-cases/create-language-use-case'
import {assignLanguageToPersonUseCase} from './use-cases/assign-language-use-case'
import * as Handlebars from 'handlebars'
import {readFileSync} from 'fs'
import {join} from 'path'
import * as puppeteer from 'puppeteer-core'
import * as chromium from 'chrome-aws-lambda'

@Injectable()
export class AtGptDatabaseService implements OnModuleInit {
  private llm: ChatOpenAI

  constructor(
    @InjectRepository(Persona) private personaRepository: Repository<Persona>,
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
    @InjectRepository(Idioma) private languageRepository: Repository<Idioma>
  ) {}

  async onModuleInit() {
    this.llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
      modelName: 'gpt-4'
    })
  }

  async uploadFile(file: Express.Multer.File) {
    const extract = await uploadFileUseCase(file, this.llm)
    console.log('extract', extract)
    try {
      const persona = await createEmployeeUseCase(this.personaRepository, {
        nombre: extract.name,
        apellidos: extract.lastName,
        email: extract.email,
        telefono: extract.phone ? extract.phone : 'No disponible'
      })
      const skills = extract.skills.technical.map((skill) => ({
        nombre: skill,
        nivel: 'medio',
        etiquetas: 'tech'
      }))
      for (const skill of skills) {
        const dbSkill = await createSkillUseCase(this.skillRepository, skill)
        await assignSkillToPersonUseCase(
          this.personaRepository,
          dbSkill,
          persona.email
        )
      }
      const languages = extract.languages.map((language) => ({
        idioma: language.name,
        nivel: language.level
      }))
      for (const language of languages) {
        const dbLanguage = await createLanguageUseCase(
          this.languageRepository,
          language
        )
        await assignLanguageToPersonUseCase(
          this.personaRepository,
          dbLanguage,
          persona.email
        )
      }

      return persona
    } catch (error) {
      throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST)
    }
  }

  async findAllPeople(): Promise<Persona[]> {
    return this.personaRepository.find()
  }

  async generatePdf(idPersona: number): Promise<Buffer> {
    const persona = await this.personaRepository.findOne({
      where: {id_persona: idPersona},
      relations: ['idiomas', 'skills']
    })

    if (!persona) {
      throw new Error('Persona no encontrada')
    }

    const templateHtml = readFileSync(
      join(__dirname, 'template-cv.hbs'),
      'utf8'
    )
    const template = Handlebars.compile(templateHtml)

    const data = {
      nombre: persona.nombre,
      apellido: persona.apellidos,
      email: persona.email,
      iniciales: persona.nombre.charAt(0) + persona.apellidos.charAt(0),
      resumen: 'Resumen ejecutivo del usuario',
      experiencia: [
        {
          cliente: 'Cliente XXX',
          proyecto: 'Proyecto XXX',
          funciones: 'Aquí están descritas las funciones XXX del soci@',
          herramientas: 'XXX, XXX'
        }
      ],
      skills: persona.skills.map((skill) => skill.nombre),
      idiomas: persona.idiomas.map((idioma) => idioma.idioma)
    }

    const html = template(data)

    try {
      const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: chromium.headless
      })
      const page = await browser.newPage()
      await page.setContent(html, {waitUntil: 'networkidle0'})
      const pdfBuffer = await page.pdf({format: 'A4'})
      await browser.close()

      return pdfBuffer
    } catch (error) {
      console.log('error', error)
      throw new HttpException(
        'Error generando el PDF',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
