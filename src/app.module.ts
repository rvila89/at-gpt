import {Module} from '@nestjs/common'

import {ConfigModule} from '@nestjs/config'

// import {ormConfig} from '../ormConfig'
import {AtGptChatModule} from './at-gpt-chat/at-gpt-chat.module'
import {AtGptDatabaseModule} from './at-gpt-database/at-gpt-database.module'
import {TypeOrmModule} from '@nestjs/typeorm'
import {join} from 'path'
import * as fs from 'fs'
import {Persona} from './at-gpt-database/entities/persona.entity'
import {Educacion} from './at-gpt-database/entities/educacion.entity'
import {Idioma} from './at-gpt-database/entities/idioma.entity'
import {Skill} from './at-gpt-database/entities/skill.entity'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const srcPath = join(__dirname, 'data', 'atdb03_bck.db')
        const destPath = '/tmp/atdb03_bck.db'

        // Copia el archivo de la base de datos a /tmp si no existe
        if (!fs.existsSync(destPath)) {
          fs.mkdirSync('/tmp', {recursive: true})
          fs.copyFileSync(srcPath, destPath)
        }

        return {
          type: 'sqlite',
          database: destPath, // Usa la base de datos en /tmp
          entities: [Persona, Educacion, Idioma, Skill],
          synchronize: true
        }
      }
    }),
    AtGptChatModule,
    AtGptDatabaseModule
  ]
})
export class AppModule {}
