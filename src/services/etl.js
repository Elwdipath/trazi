import fs from 'fs'

const dbPath = 'src/data/city_populations.csv'

function normalizeString(string){
    if (string !== undefined){
        let split = string.split(' ')
        let join = split.join('')
        
        return join.toLowerCase()
    }
}

//Check if csv file exists and if it does, start etl process
function main(){
    if (fs.existsSync(dbPath)){
        new Promise((resolve, reject) => {
            fs.readFile(dbPath, 'utf-8', (err, data) => {
                if (err) {
                    console.error(`Error reading file: ${err}`)
                    process.exit(1)
                }
                const lines = data.split(/\r?\n/)
                const csvData = lines.map((line) => line.split(','))
                let transformedData = {}
            
                csvData.forEach(index => {
                    if (index !== undefined) {
                        const city = normalizeString(index[0])
                        const state = normalizeString(index[1])
                        const population = index[2]
                        
                        if (!transformedData[state]){
                            transformedData[state] = {}
                        }
                
                        transformedData[state][city] = parseInt(population)
                    }
                })
                fs.writeFile('src/data/popDb.json', JSON.stringify(transformedData), (err) => {
                    if (err){
                        console.error(`Error in ETL process: ${err}}`)
                        return
                    } else {
                        console.log('ETL Process Complete')
                    }
                    
                })
                // Remove csv file as it is no longer going to be used. 
                fs.rm('src/data/city_populations.csv', (err) => {
                    if (err){
                        console.error(err)
                    } else {
                        console.log('CSV file deleted')
                        //Exit ETL process and start Server
                        resolve()
                        process.exit(0)
                    }
                })
            })
        })
    } else {
        process.exit(0)
    }
}

main()