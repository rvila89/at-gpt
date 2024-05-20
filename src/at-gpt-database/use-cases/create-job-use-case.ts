import {Repository} from 'typeorm'
import {Trabajo} from '../entities/trabajo.entity'

interface JobOptions {
  empresa: string
  fechaini: Date
  fechafin: Date
  cargo: string
  resumen: string
  personaId: number
}

export const createJobUseCase = async (
  trabajoRepository: Repository<Trabajo>,
  job: JobOptions
) => {
  const newJob = trabajoRepository.create({
    empresa: job.empresa,
    fechaini: job.fechaini,
    fechafin: job.fechafin,
    cargo: job.cargo,
    resumen: job.resumen,
    persona: {id_persona: job.personaId}
  })

  return await trabajoRepository.save(newJob)
}
