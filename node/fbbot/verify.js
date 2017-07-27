'use strict'

const http = require('http');
const qs = require('querystring');
const url = require('url');
const PORT = process.env.PORT || 3000;
const TOKEN = 'kmifa'; //TOKENに適当な文字列をいれましょう。

http.createServer((req, res) => {
    const query = qs.parse(url.parse(req.url).query);
    if(query['hub.mode'] === 'subscribe' && query['hub.verify_token'] === TOKEN){
        console.log("Validating webhook");
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(query['hub.challenge']);
    }else{
        console.error("Failed validation. Make sure the validation tokens match.");
        res.writeHead(403, {'Content-Type': 'text/plain'});
        res.end('error');
    }
}).listen(PORT);
console.log(`Server running at ${PORT}`);
