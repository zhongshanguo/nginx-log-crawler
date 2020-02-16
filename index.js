#!/usr/bin/env node


var fs = require("fs");
var readline = require('readline');
var http = require('http');

let server = '127.0.0.1';

function send(log) {
    var str = JSON.stringify(log);
    var options = {
        hostname: server,
        port: 39999,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    };
    var req = http.request(options,
        function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                JSON.parse(chunk)
            });
        });
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    req.write(str);
    req.end();
}

function readLog(rl) {
    rl.on("line", function (line) {
        send({log: line});
    });
}

function main() {
    let serverArgPos = 0;
    serverArgPos = process.argv.indexOf('-s');
    if (serverArgPos < 1) {
        serverArgPos = process.argv.indexOf('s');
    }
    if (serverArgPos > 0) {
        serverArgPos++;
        if (process.argv.length > serverArgPos) {
            server = process.argv[serverArgPos];
        }
    }
    console.log('server:', server);

    var output = fs.createWriteStream("/dev/null");
    var rl = readline.createInterface(process.stdin, output);
    readLog(rl);
}

void main();