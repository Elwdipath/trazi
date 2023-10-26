import Fastify from "fastify";
const fastify = Fastify({ logger: true })

fastify.get('/', (request, response) => {
    response.send("Hello World")
})

fastify.get('/api/population/state/:state/city/:city', (request, response) => {
    response.send("WIP")
})

fastify.put('/api/population/state/:state/city/:city', (request, response) => {
    response.send("Hello World")
})

fastify.listen({ port: 5555 }, (err, address) => {
    if (err){
        fastify.log.err(err)
        process.exit(1)
    }
    console.log(`Listening on Port : ${ address } 🌎`)
})