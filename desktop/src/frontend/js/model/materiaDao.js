let table = 'materia';
let materiaDao = {
    select: () => {
        return fetch(`${connectionDao.getUrl()}/${table}`).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    selectById: (id) => {
        return fetch(`${connectionDao.getUrl()}/${table}/${id}`).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    selectJoinCicloDocenteCarrera: (id) => {
        return fetch(`${connectionDao.getUrl()}/${table}/join/ciclo_docente_carrera`).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    selectJoinDocenteCicloCarreraParalelo: (id) => {
        return fetch(`${connectionDao.getUrl()}/${table}/join/docente_ciclo_carrera_paralelo`).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    insert: (nombre,nhps,id_docente,id_ciclo) => {
        return fetch(`${connectionDao.getUrl()}/${table}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                nhps: nhps,
                id_docente: id_docente,
                id_ciclo: id_ciclo
            })
        }).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    update: (id,nombre,nhps,id_docente,id_ciclo) => {
        return fetch(`${connectionDao.getUrl()}/${table}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                nhps: nhps,
                id_docente: id_docente,
                id_ciclo: id_ciclo
            })
        }).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    delete: (id) => {
        return fetch(`${connectionDao.getUrl()}/${table}/${id}`, {
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

