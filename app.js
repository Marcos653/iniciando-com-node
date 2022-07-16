const express = require("express")
const { randomUUID } = require("crypto")
const fs = require("fs")

const app = express()

app.use(express.json())

let products = []

fs.readFile("products.json", "utf-8", (err, data) => {
    if(err){
        console.log(err)
    }else{
        products = JSON.parse(data)
    }
})

// body = sempre que eu quiser enviar dados para minha aplicacao
// params = /products/12416541615
// query = /products?id=132416541654

app.post("/products", (req, res) => {

    const {name, price} = req.body

    const product = {
        name,
        price,
        id: randomUUID(),
    }

    products.push(product)

    productFile()

    return res.json(product)
} )

app.get("/primeira-rota", (req, res) => {
    
    return res.json({
        message: "Acessou a primeira rota com nodemon"
    })
})

app.get("/products", (req, res) => {

    return res.json(products)
})

app.get("/products/:id", (req, res) => {
    const {id } = req.params
    const product = products.find((product) => product.id === id)
    return res.json(product)
})


app.put("/products/:id", (req, res) => {
    const {id } = req.params
    const {name, price} = req.body

    const productIndex = products.findIndex(product => product.id === id)
    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    }

    productFile()

    return res.json(products[productIndex])
} )


app.delete("/products/:id", (req, res) => {
    const {id } = req.params
    const productIndex = products.findIndex(product => product.id === id)
    // products.pop(productIndex)
    products.splice(productIndex, 1)

    productFile()

    res.json({message: "Produto deletado"})
})

function productFile(){
    fs.writeFile("products.json", JSON.stringify
    (products), (err) => {
        if(err){
            console.log(err)
        }else{
            console.log("produto inserido")
        }
    })
}

app.listen(8080, () => console.log("Servidor esta rodando na porta 8080"))