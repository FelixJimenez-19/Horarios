const receso_rows = document.getElementById("receso_rows");
const receso_boton = document.getElementById("receso_boton");

const data_rows = document.getElementById("data_rows");
const form = document.getElementById("form");
const boton = document.getElementById("boton");
// MODAL FORM CONFIG | INDEX
const elems_modal = document.querySelectorAll('#modal_formInsertUpdate');
const instances_modal = M.Modal.init(elems_modal, {
    onCloseEnd: () => {
        clearAll();
    }
});
// MODAL FORM CONFIG | END
// SELECT INPUT CONFIG | INDEX
const elems_select = document.querySelectorAll('select');
const instances_select = M.FormSelect.init(elems_select, {});
// SELECT INPUT CONFIG | END
window.onload = () => {
    select();
}
let id_modelo = null;
let loadEdit = (id) => {
    id_modelo = id;
    modeloDao.selectById(id).then((res) => {
        let horario = JSON.parse(res[0].horario);
        form.nombre.value = res[0].nombre;
        form.inicio.value = horario.inicio;
        form.fin.value = horario.fin;
        form.tiempo.value = horario.tiempo;
        let tmp = '';
        for (let i in horario.receso) {
            (receso.recesos).push(horario.receso[i]);
            tmp += `
                <tr>
                    <td>${horario.receso[i].tiempo}</td>
                    <td>${horario.receso[i].hora}</td>
                    <td>
                        <a onclick="receso.loadEdit('${horario.receso[i].tiempo}', ${horario.receso[i].hora}, ${i})" href="#modal_formInsertUpdate" class="waves-effect waves-light btn modal-trigger">
                            <i class="material-icons">create</i>
                        </a>
                        <a onclick="receso.delete(${i})" class="waves-effect waves-light btn">
                            <i class="material-icons">delete</i>
                        </a>
                    </td>
                </tr>`;
        }
        receso_rows.innerHTML = tmp;
    });
}
let insert = () => {
    if (isFull()) {
        let horario = {
            inicio: form.inicio.value,
            fin: form.fin.value,
            tiempo: form.tiempo.value,
            receso: receso.recesos
        }
        modeloDao.insert(form.nombre.value, JSON.stringify(horario)).then((res) => {
            select();
            M.toast({
                html: 'Registro guardado!'
            });
            M.Modal.getInstance(document.getElementById('modal_formInsertUpdate')).close();
        });
    } else {
        M.toast({
            html: 'Llena todos los campos!'
        });
    }
}
let update = () => {
    if (isFull()) {
        let horario = {
            inicio: form.inicio.value,
            fin: form.fin.value,
            tiempo: form.tiempo.value,
            receso: receso.recesos
        }
        modeloDao.update(id_modelo, form.nombre.value, JSON.stringify(horario)).then((res) => {
            select();
            M.toast({
                html: 'Registro Actualizado!'
            });
            M.Modal.getInstance(document.getElementById('modal_formInsertUpdate')).close();
        });
    } else {
        M.toast({
            html: 'Llena todos los campos!'
        });
    }
}
let dell = (id) => {
    modeloDao.delete(id).then((res) => {
        select();
    });
}
let select = () => {
    modeloDao.select().then((res) => {
        dataTable.clear();
        let tmp = [];
        for (let i of res) {

            let horario = JSON.parse(i.horario);
            let recExis='';
            if(horario.receso.length){
                for (let j of horario.receso) {
                    recExis += `<b>Hora: </b>${j.hora}, <b>Tiempo: </b>${j.tiempo} <br>`;
                }
            } else {
                recExis += `<b>Sin receso(s)</b>`;
            }

            tmp.push([i.nombre, recExis ,horario.inicio,horario.fin,horario.tiempo,`
            <a onclick="loadEdit(${i.id_modelo})" href="#modal_formInsertUpdate" class="waves-effect waves-light btn modal-trigger">
            <i class="material-icons">create</i>
            </a>
            <a onclick="dell(${i.id_modelo})" class="waves-effect waves-light btn">
            <i class="material-icons">delete</i>
            </a>
            </tr>
            `]);
           
        }
        dataTable.rows.add(tmp).draw();
    });
}
let isFull = () => {
    if (
        form.nombre.value !== '' &&
        form.inicio.value !== '' &&
        form.fin.value !== '' &&
        form.tiempo.value !== ''
    ) {
        return true;
    } else {
        return false;
    }
}
let clearAll = () => {
    form.nombre.value = '';
    form.inicio.value = '';
    form.fin.value = '';
    form.tiempo.value = '';
    id_modelo = null;
    receso_rows.innerHTML = '';
    receso.recesos = [];
}
boton.onclick = () => (id_modelo === null) ? insert() : update();





// RECESO FUNCTIONS
let receso = {
    recesos: [],
    index: null,
    loadEdit: (tiempo, hora, index) => {
        form.tiempo_receso.value = tiempo;
        form.hora_receso.value = hora;
        receso.index = index;
    },
    insert: () => {
        if (receso.isFull()) {
            receso.recesos.push({
                hora: parseInt(form.hora_receso.value),
                tiempo: form.tiempo_receso.value
            });
            receso.select();
            receso.clearAll();
        } else {
            M.toast({
                html: 'Llena todos los campos de receso!'
            });
        }
    },
    update: () => {
        if (receso.isFull()) {
            receso.recesos[receso.index] = {
                hora: parseInt(form.hora_receso.value),
                tiempo: form.tiempo_receso.value
            }
            receso.select();
            receso.clearAll();
        } else {
            M.toast({
                html: 'Llena todos los campos de receso!'
            });
        }
    },
    delete: (index) => {
        receso.recesos.splice(index, 1);
        receso.select();
    },
    select: () => {
        let tmp = '';
        for (let i in receso.recesos) {
            tmp += `
                <tr>
                    <td>${receso.recesos[i].tiempo}</td>
                    <td>${receso.recesos[i].hora}</td>
                    <td>
                        <a onclick="receso.loadEdit('${receso.recesos[i].tiempo}', ${receso.recesos[i].hora}, ${i})" href="#modal_formInsertUpdate" class="waves-effect waves-light btn modal-trigger">
                            <i class="material-icons">create</i>
                        </a>
                        <a onclick="receso.delete(${i})" class="waves-effect waves-light btn">
                            <i class="material-icons">delete</i>
                        </a>
                    </td>
                </tr>`;
        }
        receso_rows.innerHTML = tmp;
    },
    isFull: () => {
        if (form.tiempo_receso.value !== '' && form.hora_receso.value !== '') {
            return true;
        } else {
            return false;
        }
    },
    clearAll: () => {
        form.hora_receso.value = '';
        form.tiempo_receso.value = '';
        receso.index = null;
    }
}
receso_boton.onclick = () => (receso.index === null) ? receso.insert() : receso.update();