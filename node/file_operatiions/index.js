const fs = require('fs')
const stream = require('stream')
const zlib = require('zlib')

DAT_FILE = './dat.txt'

fs.stat(DAT_FILE, (err, stats) => {
    if(err) throw err;
    console.log(`stats: ${JSON.stringify(stats,null, '    ')}`)
})

let fileReader = fs.createReadStream(DAT_FILE)
fileReader.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
})
fileReader.on('end', ()=>{
    console.log("Read Done.")
})

let fileZiper = zlib.createGzip();
let fileWriter = fs.createWriteStream('dat.zip')

fileReader.pipe(fileZiper).pipe(fileWriter);

fileWriter.on('end', ()=>{
    console.log("Zip Done.")
})






