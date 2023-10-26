import Fastify from "fastify";
import popDb from './src/data/transformed.json' assert {type: 'json'}

const fastify = Fastify({ logger: true })

fastify.get('/', (request, reply) => {
    reply.send("Hello World")
})

fastify.get('/api/population/state/:state/city/:city', (request, reply) => {
    const { state, city} = request.params
    let payload = popDb[state][city]
    reply.send(payload)
})

fastify.put('/api/population/state/:state/city/:city', (request, reply) => {
    reply.send("Hello World")
})

fastify.listen({ port: 5555 }, (err, address) => {
    if (err){
        fastify.log.err(err)
        process.exit(1)
    }
    console.log(`Listening on Port : ${ address } 🌎`)
})