// let horarioDao = {
//     insert: (id_periodo, id_paralelo, horario) => {
//         return _connectionDao.query(`
//             INSERT INTO horario SET id_periodo=${id_periodo}, id_paralelo=${id_paralelo}, horario='${JSON.stringify(horario)}'
//         `).then((res) => {
//             return res;
//         });
//     },
//     select: () => {
//         return _connectionDao.query(`
//             SELECT * FROM horario
//         `).then((res) => {
//             return res;
//         });
//     }
// }

let _horarioConfig = {
    table: 'horario'
}
let horarioDao = {
    select: () => {
        return fetch(`${connectionDao.getUrl()}/${_horarioConfig.table}`).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    selectById: (id) => {
        return fetch(`${connectionDao.getUrl()}/${_horarioConfig.table}/${id}`).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    selectByIdPeriodo: (id) => {
        return fetch(`${connectionDao.getUrl()}/${_horarioConfig.table}/id_periodo/${id}`).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    insert: (horario,id_periodo,id_paralelo) => {
        return fetch(`${connectionDao.getUrl()}/${_horarioConfig.table}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                horario: horario,
                id_periodo: id_periodo,
                id_paralelo: id_paralelo
            })
        }).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    update: (id,horario,id_periodo,id_paralelo) => {
        return fetch(`${connectionDao.getUrl()}/${_horarioConfig.table}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                horario: horario,
                id_periodo: id_periodo,
                id_paralelo: id_paralelo
            })
        }).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    delete: (id) => {
        return fetch(`${connectionDao.getUrl()}/${_horarioConfig.table}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
            })
        }).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    }
}