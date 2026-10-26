const {fork} = require("child_process");
const path = require("path");

console.log("Start...");

const child = fork(path.join(__dirname, 'fibo.js'));;

child.send({number: 40});

child.on("message", (data) => {
    console.log("Response received , ", data);
    child.disconnect();
})

console.log('Done...');