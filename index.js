#!/usr/bin/env node


var fs = require("fs");
var readline = require('readline');
var http = require('http');

function readLog(rl) {
    rl.on("line", function (line) {
        console.log(' ');
        console.log(line);
        console.log(' ');
    });
}

function main() {
    var output = fs.createWriteStream("/dev/null");
    var rl = readline.createInterface(process.stdin, output);
    readLog(rl);
}

main();