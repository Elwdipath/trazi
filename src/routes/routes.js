import popDb from '../data/transformed.json' assert { type: 'json' }

function queryDb(method, payload){
    switch (method) {
        case 'get':
            return popDb[payload.state][payload.city]
        case 'put':
            console.log('put')
            break;
        case 'delete': 
            console.log('delete')
            break;
        case 'post': 
            console.log('post')
            break;
        default:
            console.log('Invalid Method')
    }
}

export async function routes(fastify, options){
    fastify.get('/api/population/state/:state/city/:city', (request, reply) => {
        const { state, city} = request.params
        if (!popDb[state] || !popDb[state][city]){
            return reply.send(`Unknown city or state: ${city}, ${state}`)  
        } else {
            let payload = queryDb('get', { state: state, city: city})
            return reply.send(payload)
        }
    })

    fastify.get('/', (request, reply) => {
        return reply.send("Hello World")
    })
    
    fastify.put('/api/population/state/:state/city/:city', (request, reply) => {
        const { state, city } = request.params
        const pop = request.body
        updateDb('put', {city, state, pop})
        reply.send("Hello World")
    })
}