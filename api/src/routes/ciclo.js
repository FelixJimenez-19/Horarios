const { Router } = require('express');
const router = Router();
const Connection = require('../configs/connection');
let conn = new Connection();
let table = 'ciclo';
//GET
module.exports = router.get(`/${table}`, (req, res) => {
    conn.db_query(`
        SELECT * FROM ${table} ORDER BY nombre ASC
    `, res);
});
module.exports = router.get(`/${table}/:id`, (req, res) => {
    conn.db_query(`
        SELECT * FROM ${table} WHERE id_${table} = ${req.params.id}
    `, res);
});
module.exports = router.get(`/${table}/join/carrera`, (req, res) => {
    conn.db_query(`
    select 
    ciclo.id_${table} as ${table}_id, 
    ${table}.nombre as ${table}_nombre, 
    carrera.id_carrera as carrera_id, 
    carrera.nombre as carrera_nombre
    from ${table}
    inner join carrera on ${table}.id_carrera = carrera.id_carrera ORDER BY carrera_nombre ASC
    `, res);
});

//POST
module.exports = router.post(`/${table}`, (req, res) => {
    conn.db_query(`
        INSERT INTO ${table}(nombre, id_carrera) VALUES ('${req.body.nombre}','${req.body.id_carrera}')
    `, res);
});

//PUT
module.exports = router.put(`/${table}/:id`, (req, res) => {
    conn.db_query(`
        UPDATE ${table} SET nombre='${req.body.nombre}', id_carrera='${req.body.id_carrera}' WHERE id_${table} = ${req.params.id}
    `, res);
});

//DELETE
module.exports = router.delete(`/${table}/:id`, (req, res) => {
    conn.db_query(`
        DELETE FROM ${table} WHERE id_${table} = ${req.params.id}
    `, res);
});