
const {spawn} = require("child_process");
console.log("Starting...");

const child=spawn('cmd', ['/c', 'echo %cd%']);

child.stdout.on('data', (data) => {
    console.log(data.toString());
});

child.stderr.on('data', (error) => {
    console.log(error.toString());
});

child.on('close', (code) => {
    console.log("child process closed", code);
});

console.log("computation doen!");
