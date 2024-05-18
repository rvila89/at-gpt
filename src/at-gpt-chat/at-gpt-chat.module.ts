import {Module} from '@nestjs/common'
import {AtGptChatController} from './at-gpt-chat.controller'
import {AtGptChatService} from './at-gpt-chat.service'

@Module({
  controllers: [AtGptChatController],
  providers: [AtGptChatService]
})
export class AtGptChatModule {}
