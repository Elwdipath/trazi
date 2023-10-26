import Fastify from "fastify";
const fastify = Fastify({ logger: true })

fastify.get('/', (request, response) => {
    response.send("Hello World")
})

fastify.listen({ port: 3000 }, (err, address) => {
    if (err){
        fastify.log.err(err)
        process.exit(1)
    }
    console.log(`Listening on Port : ${ address } 🌎`)
})