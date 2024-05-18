import {Module} from '@nestjs/common'
import {AtGptAssistantService} from './at-gpt-assistant.service'
import {AtGptAssistantController} from './at-gpt-assistant.controller'

@Module({
  controllers: [AtGptAssistantController],
  providers: [AtGptAssistantService]
})
export class AtGptAssistantModule {}
