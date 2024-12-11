const { Router } = require('express');
const router = Router();
const Connection = require('../configs/connection');
let conn = new Connection();
let table = 'horario';
//GET
module.exports = router.get(`/${table}`, (req, res) => {
    conn.db_query(`
        SELECT * FROM ${table} ORDER BY id_paralelo ASC
    `, res);
});
module.exports = router.get(`/${table}/:id`, (req, res) => {
    conn.db_query(`
        SELECT * FROM ${table} WHERE id_${table} = ${req.params.id}
    `, res);
});
module.exports = router.get(`/${table}/id_periodo/:id`, (req, res) => {
    conn.db_query(`
        SELECT * FROM ${table} WHERE id_periodo = ${req.params.id}
    `, res);
});


//POST
module.exports = router.post(`/${table}`, (req, res) => {
    conn.db_query(`
        INSERT INTO ${table}(horario, id_periodo,id_paralelo) VALUES ('${req.body.horario}', '${req.body.id_periodo}', '${req.body.id_paralelo}')
    `, res);
});

//PUT
module.exports = router.put(`/${table}/:id`, (req, res) => {
    conn.db_query(`
        UPDATE ${table} SET horario='${req.body.horario}', id_periodo='${req.body.id_periodo}', id_paralelo='${req.body.id_paralelo}' WHERE id_${table} = ${req.params.id}
    `, res);
});

//DELETE
module.exports = router.delete(`/${table}/:id`, (req, res) => {
    conn.db_query(`
        DELETE FROM ${table} WHERE id_${table} = ${req.params.id}
    `, res);
});