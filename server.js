const http = require("http");

http.createServer((req, res) =>{
    res.writeHead(200, { 'Content-Type': 'application/json' })

    if(req.url === '/produto'){
        res.end(JSON.stringify({
            message: "Rota de produto"
        }))
    }

    if(req.url === '/user'){
        res.end(JSON.stringify({
            message: "Rot de user"
        }))
    }

    res.end(JSON.stringify({
        message: "Qualque outra coisa"
    }))

}).listen(8080, () => console.log("Servidor esta rodando na porta 8080"));
