import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { FastifyInstance } from 'fastify'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pump = promisify(pipeline) // -> pipeline é um jeito de saber que o processo de stream chegou ao final

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 5_242_880, // Tamanho máx do arquivo 5mb
      },
    })
    if (!upload) return reply.status(400).send()

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    // mimeType categorização de tipos de arquvivos
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)
    if (!isValidFileFormat) {
      return reply.status(400).send()
    }

    const fileId = randomUUID()
    const extension = extname(upload.filename)
    const filename = fileId.concat(extension)
    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads', filename), // resolve vai padronzar os caminhos de acordo com as variações que existem para cada sistema operacional
    )
    await pump(upload.file, writeStream)

    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${filename}`, fullUrl).toString()
    return { fileUrl }
  })
}
