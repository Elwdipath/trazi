import Fastify from "fastify";
import { routes } from "./src/routes/routes.js";

const fastify = Fastify({ logger: true })

fastify.register(routes)

fastify.listen({ port: 5555 }, (err, address) => {
    if (err){
        fastify.log.err(err)
        process.exit(1)
    }
    console.log(`Listening on Port : ${ address } 🌎`)
})