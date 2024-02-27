const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommercemesttra',
    password: 'Manu3009',
    port: 5432
});

// const teste = async() => {
//     const result = await pool.query('select * from products');
//     console.log(result);
// }

// teste();

module.exports = pool;