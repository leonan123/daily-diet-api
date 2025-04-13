import fastify from 'fastify'

const server = fastify()

server.get('/hello', () => {
  return 'Hello World'
})

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🔥 HTTP server running on http://localhost:3333')
  })
