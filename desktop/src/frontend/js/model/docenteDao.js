let _docenteConfig={
    table : 'docente'
}

let docenteDao = {
    select: () => {
        return fetch(`${connectionDao.getUrl()}/${_docenteConfig.table}`).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    selectById: (id) => {
        return fetch(`${connectionDao.getUrl()}/${_docenteConfig.table}/${id}`).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    insert: (nombre,apellido,color) => {
        return fetch(`${connectionDao.getUrl()}/${_docenteConfig.table}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                apellido: apellido,
                color: color
            })
        }).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    update: (id,nombre,apellido,color) => {
        return fetch(`${connectionDao.getUrl()}/${_docenteConfig.table}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                apellido: apellido,
                color: color
                
            })
        }).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    delete: (id) => {
        return fetch(`${connectionDao.getUrl()}/${_docenteConfig.table}/${id}`, {
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