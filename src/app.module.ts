import {Module} from '@nestjs/common'

import {ConfigModule} from '@nestjs/config'

import {ormConfig} from '../ormConfig'
import {AtGptChatModule} from './at-gpt-chat/at-gpt-chat.module'
import {AtGptDatabaseModule} from './at-gpt-database/at-gpt-database.module'
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig),
    AtGptChatModule,
    AtGptDatabaseModule
  ]
})
export class AppModule {}
