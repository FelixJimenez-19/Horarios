const { Router } = require('express');
const router = Router();
const Connection = require('../configs/connection');
let conn = new Connection();
let table = 'carrera';
//GET
module.exports = router.get(`/${table}`, (req, res) => {
    conn.db_query(`
        SELECT * FROM ${table} ORDER BY  nombre ASC
    `, res);
});
module.exports = router.get(`/${table}/:id`, (req, res) => {
    conn.db_query(`
        SELECT * FROM ${table} WHERE id_${table} = ${req.params.id}
    `, res);
});


//POST
module.exports = router.post(`/${table}`, (req, res) => {
    conn.db_query(`
        INSERT INTO ${table}(nombre) VALUES ('${req.body.nombre}')
    `, res);
});

//PUT
module.exports = router.put(`/${table}/:id`, (req, res) => {
    conn.db_query(`
        UPDATE ${table} SET nombre='${req.body.nombre}' WHERE id_${table} = ${req.params.id}
    `, res);
});

//DELETE
module.exports = router.delete(`/${table}/:id`, (req, res) => {
    conn.db_query(`
        DELETE FROM ${table} WHERE id_${table} = ${req.params.id}
    `, res);
});