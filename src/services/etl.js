import fs from 'fs'

const dbPath = 'src/data/city_populations.csv'

if (fs.existsSync(dbPath)){
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`)
            process.exit(1)
        }
        const lines = data.split(/\r?\n/)
        const csvData = lines.map((line) => line.split(','))
        
        let transformedData = {}
    
        csvData.forEach(index => {
            const [city, state, population] = index 
    
            if (!transformedData[state]){
                transformedData[state] = {}
            }
    
            transformedData[state][city] = parseInt(population)
        })
        fs.writeFile('src/data/transformed.json', JSON.stringify(transformedData), (err) => {
            if (err){
                console.error(err)
                return
            }
            console.log('done')
        })
        //Remove csv file as it is no longer going to be used. 
        fs.rm('src/data/city_populations.csv', (err) => {
            if (err){
                console.error(err)
            }
            console.log('CSV file deleted')
        })
    })
} else {
    console.log('no csv file')
}

