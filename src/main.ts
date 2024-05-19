import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {ValidationPipe} from '@nestjs/common'
import * as bodyParser from 'body-parser'
import {NextFunction, Response} from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'https://at-gpt-frontend.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept'
  })

  // Middleware para verificar cabeceras CORS
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header(
      'Access-Control-Allow-Origin',
      'https://at-gpt-frontend.vercel.app'
    )
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
    )
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept')
    if (req.method === 'OPTIONS') {
      return res.status(200).end()
    }
    next()
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
