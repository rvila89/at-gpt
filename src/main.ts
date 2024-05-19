import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {ValidationPipe} from '@nestjs/common'
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'https://at-gpt-frontend.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept'
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  // the next two lines did the trick
  app.use(bodyParser.json({limit: '50mb'}))
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

  await app.listen(3000)
}
bootstrap()
