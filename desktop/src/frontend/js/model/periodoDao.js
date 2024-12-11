// let _periodoConfig.table = 'periodo';
// let periodoDao = {
//     select: () => {
//         return fetch(`${connectionDao.getUrl()}/${_periodoConfig.table}`).then( (res) => res.json() ).then( (res) => {
//             return res;
//         });
//     },
//     selectById: (id) => {
//         return fetch(`${connectionDao.getUrl()}/${_periodoConfig.table}/${id}`).then( (res) => res.json() ).then( (res) => {
//             return res;
//         });
//     }
// }
let _periodoConfig = {
    table: 'periodo'
}
let periodoDao = {
    select: () => {
        return fetch(`${connectionDao.getUrl()}/${_periodoConfig.table}`).then((res) => res.json()).then((res) => {
            return res;
        });
    },
    selectById: (id) => {
        return fetch(`${connectionDao.getUrl()}/${_periodoConfig.table}/${id}`).then((res) => res.json()).then((res) => {
            return res;
        });
    },
    insert: (nombre, horario) => {
        return fetch(`${connectionDao.getUrl()}/${_periodoConfig.table}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                horario: horario
            })
        }).then((res) => res.json()).then((res) => {
            return res;
        });
    },
    update: (id, nombre, horario) => {
        return fetch(`${connectionDao.getUrl()}/${_periodoConfig.table}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                horario: horario
            })
        }).then((res) => res.json()).then((res) => {
            return res;
        });
    },
    delete: (id) => {
        return fetch(`${connectionDao.getUrl()}/${_periodoConfig.table}/${id}`, {
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