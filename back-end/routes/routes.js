const express = require('express');
const crypto = require('crypto');
const pool = require('../dbConfig');

const router = express.Router();

// [GET] Rota que lista todos os produtos
router.get('/', async (req, res) =>{
    try{
        const { rows } = await pool.query('select * from products');
        res.send(rows); // ou pode usar products.rows (variavel se chama products)
    }catch (error){
        console.error('Erro ao buscar produto', error);
        res.status(500).json({
            message: 'Erro durante a busca',
            data: error
        })
    }
})

//[GET] Rota que lista produto especifico pelo ID
router.get('/:id' , async (req,res) =>{
    const id = req.params.id;
    try {
        const { rows } = await pool.query('select * from products where id = $1', [id]);
        if(rows.length === 0) {
            res.status(404).send('Product not found');
        }else{
            res.send(rows);
        }
    } catch (error) {
        console.error('Erro ao buscar produto', error)
        res.status(500).json({
            message: 'Erro durante a busca',
            data: error
        })  
    }
})

//[POST] - Cadastra um novo produto
router.post('/add' , async (req, res) => {
    const product = req.body; // Onde ele vai buscar a requisição no body do cliente
    
    if (!product.name || !product.category || !product.price) {
        res.status(400).send('Esta faltando dados no produto');
        return;
    }
    const { rows } = await pool.query('INSERT INTO products (id, name, category, price) VALUES ($1, $2, $3, $4) RETURNING *', [crypto.randomUUID(), product.name, product.category, product.price])

    res.status(201).json({
        status: 'product registered successfully',
        data: rows
    });

})

//[DELETE] - Eclui um produto
router.delete('/delete/:id' , async (req,res) => {
    const id = req.params.id;

    const { rows } = await pool.query('DELETE FROM products WHERE id = $1', 
        [id]
    )

    res.json({
        message: 'Produto excluido com sucesso',
        data: rows
    });

})

//[PUT] - Atualiza um produto pré cadastrado
router.put('/edit/:id' , async (req,res) => {
    const id = req.params.id;
    const editProduct = req.body;

    const { rows } = await pool.query('UPDATE products SET name = $1, category = $2, price = $3 WHERE id = $4',
        [editProduct.name, editProduct.category, editProduct.price, id]
    )

    res.json({
        message: 'Product updated sucessfuly',
        data: rows
    })
})

module.exports = router;