//Server File
import {createRequire} from 'module';
const require = createRequire(import.meta.url);

const fs = require('fs');
const http = require('http');
const PORT = 8080;

http.createServer((req, res) => {
    const myURL = new URL(req.url, "http://localhost");
    let filename = "." + myURL.pathname;

    if(filename === "./"){
        filename = "./index.html"
    }

    fs.access(filename, fs.constants.F_OK, (err) => {
        if (err) {
            fs.readFile('./404.html', 'utf-8', (error, errorPageData) => {
                if (error){
                    res.writeHead(500);
                    res.end();
                } else {
                    res.writeHead(404, {'Content-Type' : 'text/html'});
                    res.write(errorPageData);
                    res.end();
                }
            });
        } else {
            fs.readFile(filename, 'utf-8', (error, data) => {
                if (error){
                    res.writeHead(500);
                    res.end();
                } else {
                    res.writeHead(200, {'Content-Type' : 'text/html'});
                    res.write(data);
                    res.end();
                }
            })
        }
    });

    // fs.readFile(filename, 'utf-8', (err, data) => {
    //     if (err){
    //         // res.writeHead(500);
    //         // return res.end();
    //         fs.readFile('./404.html', 'utf-8', (error, errorPageData) => {
    //             if(error){
    //                 res.writeHead(500);
    //                 return res.end();
    //             } else {
    //                 res.writeHead(404, {'Content-Type': 'text/html'});
    //                 res.write(errorPageData);
    //                 res.end();
    //             }
    //         })
    //     }
    //     res.writeHead(200, {'Content-Type': 'text/html'});
    //     res.write(data);
    //     res.end();
    // })
}).listen(PORT)
