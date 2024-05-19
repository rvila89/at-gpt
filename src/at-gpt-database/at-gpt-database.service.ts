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
import PdfPrinter from 'pdfmake'

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
      throw new Error('Persona not found')
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
      initials: persona.nombre.charAt(0) + persona.apellidos.charAt(0),
      resumen: 'Resumen ejecutivo del usuario',
      experiencia: [
        {
          cliente: 'Cliente XXX',
          proyecto: 'Proyecto XXX',
          funciones: 'Aquí estan descritas las funciones XXX del soci@',
          herramientas: 'XXX, XXX'
        }
      ],
      skills: persona.skills.map((skill) => skill.nombre),
      idiomas: persona.idiomas.map((idioma) => idioma.idioma)
    }

    const html = template(data)

    const fonts = {
      Roboto: {
        normal: 'node_modules/pdfmake/build/vfs_fonts.js',
        bold: 'node_modules/pdfmake/build/vfs_fonts.js',
        italics: 'node_modules/pdfmake/build/vfs_fonts.js',
        bolditalics: 'node_modules/pdfmake/build/vfs_fonts.js'
      }
    }

    const printer = new PdfPrinter(fonts)
    const docDefinition = {
      content: [
        {text: `Nombre: ${data.nombre}`, fontSize: 15, bold: true},
        {text: `Apellido: ${data.apellido}`, fontSize: 15, bold: true},
        {text: `Email: ${data.email}`, fontSize: 15},
        {text: `Iniciales: ${data.initials}`, fontSize: 15},
        {text: 'Resumen Ejecutivo', style: 'header'},
        {text: data.resumen, fontSize: 12},
        {text: 'Experiencia Profesional', style: 'header'},
        ...data.experiencia.map((exp) => [
          {text: `Cliente: ${exp.cliente}`, bold: true},
          {text: `Proyecto: ${exp.proyecto}`},
          {text: `Funciones: ${exp.funciones}`},
          {text: `Herramientas: ${exp.herramientas}`}
        ]),
        {text: 'Idiomas', style: 'header'},
        ...data.idiomas.map((idioma) => ({text: idioma, fontSize: 12})),
        {text: 'Conocimientos Informáticos', style: 'header'},
        ...data.skills.map((skill) => ({text: skill, fontSize: 12}))
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10]
        }
      }
    }

    const pdfDoc = printer.createPdfKitDocument(docDefinition)
    const chunks = []
    return new Promise<Buffer>((resolve, reject) => {
      pdfDoc.on('data', (chunk) => {
        chunks.push(chunk)
      })
      pdfDoc.on('end', () => {
        resolve(Buffer.concat(chunks))
      })
      pdfDoc.on('error', (err) => {
        reject(err)
      })
      pdfDoc.end()
    })
  }
}
