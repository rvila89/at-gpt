import {Module} from '@nestjs/common'
import {AtGptDatabaseController} from './at-gpt-database.controller'
import {AtGptDatabaseService} from './at-gpt-database.service'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Persona} from './entities/persona.entity'
import {Educacion} from './entities/educacion.entity'
import {Idioma} from './entities/idioma.entity'
import {Skill} from './entities/skill.entity'

@Module({
  controllers: [AtGptDatabaseController],
  providers: [AtGptDatabaseService],
  imports: [TypeOrmModule.forFeature([Persona, Educacion, Idioma, Skill])]
})
export class AtGptDatabaseModule {}
