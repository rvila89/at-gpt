import {Persona} from './src/at-gpt-database/entities/persona.entity'
import {Educacion} from './src/at-gpt-database/entities/educacion.entity'
import {Idioma} from './src/at-gpt-database/entities/idioma.entity'
import {Skill} from './src/at-gpt-database/entities/skill.entity'
import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const ormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: './src/data/atdb03_bck.db',
  entities: [Persona, Educacion, Idioma, Skill],
  synchronize: true
}
