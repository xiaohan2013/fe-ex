// debugger
const fs = require('fs')
const data = fs.readFileSync('./package.json');
console.log(data)

const spawn = require('child_process').spawn;
const bat = spawn('cmd.exe', ['/c', 'my.bat']);
bat.stdout.on('data', (data) => {
    console.log(">>>>>>>>>>>>>\n")
    console.log(data.toString());
})
bat.stderr.on('data', (data) => {
  console.log(data.toString());
});
bat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});

