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
import * as puppeteer from 'puppeteer'
import {createJobUseCase} from './use-cases/create-job-use-case'
import {Trabajo} from './entities/trabajo.entity'
import {formatFecha} from './utils/utils'
import {createFormacionUseCase} from './use-cases/create-formacion-use-case'
import {Educacion} from './entities/educacion.entity'

@Injectable()
export class AtGptDatabaseService implements OnModuleInit {
  private llm: ChatOpenAI

  constructor(
    @InjectRepository(Persona) private personaRepository: Repository<Persona>,
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
    @InjectRepository(Idioma) private languageRepository: Repository<Idioma>,
    @InjectRepository(Trabajo) private jobRepository: Repository<Trabajo>,
    @InjectRepository(Educacion)
    private educacionRepository: Repository<Educacion>
  ) {}

  async onModuleInit() {
    this.llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
      modelName: 'gpt-4o'
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
        telefono: extract.phone ? extract.phone : 'No disponible',
        summary: extract.summary
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
      const jobs = extract.professional_experience.map((experience) => ({
        empresa: experience.company,
        fechaini: new Date(experience.dateStart),
        fechafin: new Date(experience.dateEnd),
        cargo: experience.position,
        resumen: experience.description,
        personaId: persona.id_persona
      }))
      for (const job of jobs) {
        await createJobUseCase(this.jobRepository, job)
      }
      const formaciones = extract.education.map((education) => ({
        institucion: education.institution,
        fechafin: new Date(education.year),
        tipo: education.degree,
        personaId: persona.id_persona
      }))
      for (const formacion of formaciones) {
        await createFormacionUseCase(this.educacionRepository, formacion)
      }

      return persona
    } catch (error) {
      throw new HttpException({message: error.message}, HttpStatus.BAD_REQUEST)
    }
  }

  async findAllPeople(): Promise<Persona[]> {
    return this.personaRepository.find({
      relations: ['skills', 'idiomas', 'educaciones', 'trabajos']
    })
  }

  async generatePdf(idPersona: number): Promise<Buffer> {
    const persona = await this.personaRepository.findOne({
      where: {id_persona: idPersona},
      relations: ['idiomas', 'skills', 'trabajos', 'educaciones']
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
      nombre: persona.nombre.toUpperCase(),
      apellido: persona.apellidos.toUpperCase(),
      email: persona.email,
      initials: persona.nombre.charAt(0) + persona.apellidos.charAt(0),
      resumen: persona.summary,
      experiencia: persona.trabajos.map((experience) => ({
        fechaIni: formatFecha(experience.fechaini),
        fechaFin: formatFecha(experience.fechafin),
        empresa: experience.empresa,
        posicion: experience.cargo,
        funciones: experience.resumen
      })),
      educacion: persona.educaciones.map((educacion) => ({
        fechaFin: formatFecha(educacion.fechafin),
        institucion: educacion.institucion,
        tipo: educacion.tipo
      })),
      skills: persona.skills.map((skill) => skill.nombre),
      idiomas: persona.idiomas.map((idioma) => idioma.idioma)
    }

    const html = template(data)

    try {
      const browser = await puppeteer.launch({
        headless: true, // Ejecutar en modo sin cabeza
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      })

      const page = await browser.newPage()
      await page.setContent(html, {waitUntil: 'networkidle0'})
      const pdfBuffer = await page.pdf({
        format: 'a4', // "a4" en minúsculas
        printBackground: true // Asegúrate de que el fondo se imprima
      })
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
