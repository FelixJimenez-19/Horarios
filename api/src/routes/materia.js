const { Router } = require('express');
const router = Router();
const Connection = require('../configs/connection');
let conn = new Connection();
let table = 'materia';
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
module.exports = router.get(`/${table}/join/ciclo_docente_carrera`, (req, res) => {
    conn.db_query(`
    select 
    docente.id_docente as docente_id,
    docente.nombre as docente_nombre,
    docente.apellido as docente_apellido,
    docente.color as docente_color,
    ciclo.id_ciclo as ciclo_id,
    ciclo.nombre as ciclo_nombre,
    materia.id_materia as materia_id,
    materia.nombre as materia_nombre,
    materia.nhps as materia_nhps,
    carrera.id_carrera as carrera_id,
    carrera.nombre as carrera_nombre
    from materia
    inner join ciclo on materia.id_ciclo = ciclo.id_ciclo
    inner join carrera on carrera.id_carrera = ciclo.id_carrera
    inner join docente on docente.id_docente = materia.id_docente ORDER BY docente_nombre ASC
    `, res);
});
module.exports = router.get(`/${table}/join/docente_ciclo_carrera_paralelo`, (req, res) => {
    conn.db_query(`
    SELECT 
        paralelo.id_paralelo AS paralelo_id, 
        materia.id_materia AS materia_id, 
        materia.nombre AS materia_nombre, 
        materia.nhps AS materia_nhps, 
        docente.id_docente AS docente_id, 
        docente.nombre AS docente_nombre, 
        docente.apellido AS docente_apellido  
    FROM materia 
        INNER JOIN docente ON docente.id_docente = materia.id_docente
        INNER JOIN ciclo ON ciclo.id_ciclo = materia.id_ciclo 
        INNER JOIN carrera ON carrera.id_carrera = ciclo.id_carrera 
        INNER JOIN paralelo ON paralelo.id_ciclo = ciclo.id_ciclo
    `, res);
});


//POST
module.exports = router.post(`/${table}`, (req, res) => {
    conn.db_query(`
        INSERT INTO ${table}(nombre,nhps, id_docente,id_ciclo) VALUES ('${req.body.nombre}','${req.body.nhps}','${req.body.id_docente}','${req.body.id_ciclo}')
    `, res);
});

//PUT
module.exports = router.put(`/${table}/:id`, (req, res) => {
    conn.db_query(`
        UPDATE ${table} SET nombre='${req.body.nombre}', nhps='${req.body.nhps}', id_docente='${req.body.id_docente}',id_ciclo='${req.body.id_ciclo}' WHERE id_${table} = ${req.params.id}
    `, res);
});

//DELETE
module.exports = router.delete(`/${table}/:id`, (req, res) => {
    conn.db_query(`
        DELETE FROM ${table} WHERE id_${table} = ${req.params.id}
    `, res);
});