
let _cicloConfig ={
    table : 'ciclo'
}
let cicloDao = {
    select: () => {
        return fetch(`${connectionDao.getUrl()}/${_cicloConfig.table}`).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    selectById: (id) => {
        return fetch(`${connectionDao.getUrl()}/${_cicloConfig.table}/${id}`).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    selectJoinCarrera: () => {
        return fetch(`${connectionDao.getUrl()}/${_cicloConfig.table}/join/carrera`).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    insert: (nombre,id_carrera) => {
        return fetch(`${connectionDao.getUrl()}/${_cicloConfig.table}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                id_carrera: id_carrera
            })
        }).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    update: (id,nombre,id_carrera) => {
        return fetch(`${connectionDao.getUrl()}/${_cicloConfig.table}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                id_carrera: id_carrera
            })
        }).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    delete: (id) => {
        return fetch(`${connectionDao.getUrl()}/${_cicloConfig.table}/${id}`, {
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