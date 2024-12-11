let _paraleloConfig = {
    table: 'paralelo'
}
let paraleloDao = {
    select: () => {
        return fetch(`${connectionDao.getUrl()}/${_paraleloConfig.table}`).then((res) => res.json()).then((res) => {
            return res;
        });
    },
    selectById: (id) => {
        return fetch(`${connectionDao.getUrl()}/${_paraleloConfig.table}/${id}`).then((res) => res.json()).then((res) => {
            return res;
        });
    },
    selectJoinCicloCarrera: () => {
        return fetch(`${connectionDao.getUrl()}/${_paraleloConfig.table}/join/ciclo_carrera`).then((res) => res.json()).then((res) => {
            return res;
        });
    },
    insert: (nombre, id_ciclo) => {
        return fetch(`${connectionDao.getUrl()}/${_paraleloConfig.table}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                id_ciclo: id_ciclo
            })
        }).then((res) => res.json()).then((res) => {
            return res;
        });
    },
    update: (id, nombre, id_ciclo) => {
        return fetch(`${connectionDao.getUrl()}/${_paraleloConfig.table}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                id_ciclo: id_ciclo
            })
        }).then((res) => res.json()).then((res) => {
            return res;
        });
    },
    delete: (id) => {
        return fetch(`${connectionDao.getUrl()}/${_paraleloConfig.table}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

            })
        }).then((res) => res.json()).then((res) => {
            return res;
        });
    }
}