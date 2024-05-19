import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {ValidationPipe} from '@nestjs/common'
import * as bodyParser from 'body-parser'
import {Request, Response, NextFunction} from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true})

  app.enableCors({
    origin: ['https://at-gpt-frontend.vercel.app'],
    allowedHeaders: ['Accept', 'Content-Type'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  })
  //Middleware personalizado para habilitar CORS
  const allowCors = (req: Request, res: Response, next: NextFunction) => {
    const allowedOrigins = ['https://at-gpt-frontend.vercel.app']
    const origin = req.headers.origin as string
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,OPTIONS,PATCH,DELETE,POST,PUT'
    )
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    res.setHeader('Access-Control-Max-Age', '86400') // Cache la respuesta de preflight durante 24 horas

    if (req.method === 'OPTIONS') {
      return res.status(204).end() // Responder a la solicitud de preflight con un 204 No Content
    }

    next()
  }

  // Usa el middleware personalizado para todas las rutas
  app.use(allowCors)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  app.use(bodyParser.json({limit: '50mb'}))
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
