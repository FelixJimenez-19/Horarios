let table = 'usuario';
let usuarioDao = {
    login: (user, pass) => {
        return fetch(`${connectionDao.getUrl()}/${table}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user,
                pass: pass
            })
        }).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
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
    insert: (nombre,user,pass) => {
        return fetch(`${connectionDao.getUrl()}/${table}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                user: user,
                pass : pass
            })
        }).then( (res) => res.json() ).then( (res) => {
            return res;
        });
    },
    update: (id,nombre,user,pass) => {
        return fetch(`${connectionDao.getUrl()}/${table}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                user: user,
                pass : pass
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