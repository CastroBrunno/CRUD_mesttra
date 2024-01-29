const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const products = []

// [GET] Rota que lista todos os produtos
router.get('/', (req, res) =>{
    res.send(products);
})

//[GET] Rota que lista produto especifico pelo ID
router.get('/:id' , (req,res) =>{
    const id = req.params.id;
    const product = products.find(product => product.id == id);
    //verifico se existe o produto, se não existir, devolvo o codigo 404 com a mensagem "Product not found"
    if(!product){
        res.status(404).send('Product not found');
    }
    res.send(product);
})

//[POST] - Cadastra um novo produto
router.post('/add' , (req, res) => {
    const product = req.body; // Onde ele vai buscar a requisição no body do cliente
    const newProduct = {
        id : crypto.randomUUID(),
        ...product
    }

    if (!product.name || !product.category || !product.price) {
        res.status(400).send('Esta faltando dados no produto');
    }

    products.push(newProduct);
    res.status(201).send('product registered successfully');

})

//[DELETE] - Eclui um produto
router.delete('/delete/:id' , (req,res) => {
    const id = req.params.id;

    //procuro em qual posição esta o produto pelo seu id
    const index = products.findIndex(product => product.id == id)

    products.splice(index, 1);

    res.send('Produto excluido com sucesso');

})

//[PUT] - Atualiza um produto pré cadastrado
router.put('/edit/:id' , (req,res) => {
    const id = req.params.id;
    const editProduct = req.body;
    const index = products.findIndex(product => product.id == id);

    products[index] = {
        ...products[index],
        ...editProduct
    }

    res.send('Product updated sucessfully')
})

module.exports = router;