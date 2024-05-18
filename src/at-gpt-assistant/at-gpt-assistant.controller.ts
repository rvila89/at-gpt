import {Body, Controller, Post} from '@nestjs/common'
import {AtGptAssistantService} from './at-gpt-assistant.service'
import {QuestionDto} from './dtos/question.dto'

@Controller('at-gpt-assistant')
export class AtGptAssistantController {
  constructor(private readonly atGptAssistantService: AtGptAssistantService) {}

  @Post('create-thread')
  async createThread() {
    return await this.atGptAssistantService.createThread()
  }

  @Post('user-question')
  async userQuestion(@Body() questionDto: QuestionDto) {
    return await this.atGptAssistantService.userQuestion(questionDto)
  }
}
