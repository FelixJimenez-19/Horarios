const { Router } = require('express');
const router = Router();
const Connection = require('../configs/connection');
let conn = new Connection();
let table = 'paralelo';
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
module.exports = router.get(`/${table}/join/ciclo_carrera`, (req, res) => {
    conn.db_query(`
   
select 
${table}.id_${table} as ${table}_id,
${table}.nombre as ${table}_nombre,
ciclo.id_ciclo as ciclo_id,
ciclo.nombre as ciclo_nombre,
carrera.id_carrera as carrera_id,
carrera.nombre as carrera_nombre
from ${table}
inner join ciclo on ${table}.id_ciclo = ciclo.id_ciclo
inner join carrera on carrera.id_carrera = ciclo.id_carrera

    `, res);
});


//POST
module.exports = router.post(`/${table}`, (req, res) => {
    conn.db_query(`
        INSERT INTO ${table}(nombre, id_ciclo) VALUES ('${req.body.nombre}', '${req.body.id_ciclo}')
    `, res);
});

//PUT
module.exports = router.put(`/${table}/:id`, (req, res) => {
    conn.db_query(`
        UPDATE ${table} SET nombre='${req.body.nombre}', id_ciclo='${req.body.id_ciclo}' WHERE id_${table} = ${req.params.id}
    `, res);
});

//DELETE
module.exports = router.delete(`/${table}/:id`, (req, res) => {
    conn.db_query(`
        DELETE FROM ${table} WHERE id_${table} = ${req.params.id}
    `, res);
});