import {Controller, Get, Query} from '@nestjs/common'
import {ApiOperation, ApiTags} from '@nestjs/swagger'
import {AtGptChatService} from './at-gpt-chat.service'

@ApiTags('AI')
@Controller('at-gpt')
export class AtGptChatController {
  constructor(private readonly atGptChatService: AtGptChatService) {}

  @Get('chat')
  @ApiOperation({
    summary:
      'Give Prompt to the Agent, it will generate and execute SQL on given schema'
  })
  async chat(
    @Query('prompt') prompt: string
  ): Promise<{success: boolean; data?: string; messageError?: string}> {
    try {
      const data = await this.atGptChatService.chat(prompt)
      return {success: true, data}
    } catch (err) {
      return {success: false, messageError: err}
    }
  }
}
