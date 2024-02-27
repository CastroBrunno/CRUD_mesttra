const express = require('express');

// Inicializo a minha instancia do express
const app = express();

//importar o prodictsRouter
const productsRouter = require('./routes/routes')

// Habilita o midleware de json do express
app.use(express.json());

//inicializa a rota /products de acordo com meu arquivo do produto da rotas
app.use('/products', productsRouter);

//configurando minha primeira rota  
app.get('/', (req, res) => {
    setTimeout(() => {
        res.send('hello')
    }, 5000)
})

//configuro a porta  do nosso projeto e sua exposição
const port = 3000
app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`)
});