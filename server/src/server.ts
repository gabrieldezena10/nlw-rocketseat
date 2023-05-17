// import fastify from 'fastify'
// import { PrismaClient } from '@prisma/client'

// const app = fastify()
// const prisma = new PrismaClient()

// app.get('/hello', async () => {
//   const users = await prisma.user.findMany()
//   return users
// })

// app
//   .listen({
//     port: 3333,
//   })
//   .then(() => {
//     console.log('HTTP Server is running on http://localhost:3333')
//   })
import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'

const app = fastify()

app.register(cors, {
  origin: true, // todas as URLS de front-end poderão acessar nosso backend
})

app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 HTTP server running on port http://localhost:3333')
  })
