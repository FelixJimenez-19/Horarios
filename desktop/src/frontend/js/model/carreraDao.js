let _carreraConf = {
    table: 'carrera'
};
let carreraDao= {
    select: () => {
        return fetch(`${connectionDao.getUrl()}/${_carreraConf.table}`).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    selectById: (id) => {
        return fetch(`${connectionDao.getUrl()}/${_carreraConf.table}/${id}`).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    insert: (nombre) => {
        return fetch(`${connectionDao.getUrl()}/${_carreraConf.table}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre
                
            })
        }).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    update: (id,nombre) => {
        return fetch(`${connectionDao.getUrl()}/${_carreraConf.table}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre
                
            })
        }).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    delete: (id) => {
        return fetch(`${connectionDao.getUrl()}/${_carreraConf.table}/${id}`, {
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