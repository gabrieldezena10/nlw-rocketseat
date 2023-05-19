// quando usa o fatify/jwt com typscript precisa criar esse arquivo
// https://github.com/fastify/fastify-jwt#typescript
import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      name: string
      avatarUrl: string
    }
  }
}
