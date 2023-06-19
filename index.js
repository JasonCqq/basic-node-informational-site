//Server File
import {createRequire} from 'module';
const require = createRequire(import.meta.url);

const fs = require('fs');
const http = require('http');
const PORT = 8080;

http.createServer((req, res) => {
    
    const myURL = new URL(req.url, 'http://localhost');
    let filename = "." + myURL.pathname;
    if(filename === './'){
        filename = "./index.html"
    }

    fs.readFile(filename, 'utf-8', (err, data) => {
        if (err){
            res.writeHead(500);
            return res.end();
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    })
}).listen(PORT)
