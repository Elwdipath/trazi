import popDb from '../data/popDb.json' assert { type: 'json' }
import fs from 'fs'
const dbPath = 'src/data/popDb.json'

function updateDb(params){
    if (!popDb[params.state]){
        popDb[params.state] = {}
    }
    popDb[params.state][params.city] = parseInt(params.population)
    fs.writeFile(dbPath, JSON.stringify(popDb), 'utf8', (err) => {
        if (err) {
            throw new Error(err)
        }
    });
    return `File has been updated: ${params.state}, ${params.city}, ${params.population}`
}

export async function routes(fastify, options){
    fastify.get('/api/population/state/:state/city/:city', (request, reply) => {
        try {
            let state = request.params.state.toLowerCase()
            let city = request.params.city.toLowerCase()
            if (!popDb[state] || !popDb[state][city]){
                return reply.status(200).send(`Unknown city or state: ${city}, ${state}`)  
            } else {
                let payload = popDb[state][city]
                return reply.status(200).send(payload)
            }
        }catch (err){
            return reply.status(400).send(`There was an error with your request: ${err}`)
        }
    })

    fastify.get('/', (request, reply) => {
        return reply.status(200).send("Hello World")
    })
    
    fastify.put('/api/population/state/:state/city/:city', (request, reply) => {
        try {
            let params = {
                state: request.params.state.toLowerCase(),
                city: request.params.city.toLowerCase(),
                population: request.body
            }
            let update = updateDb(params)
    
            return reply.status(200).send(update)
        } catch (err){
            return reply.status(400).send(err)
        }
    })
}