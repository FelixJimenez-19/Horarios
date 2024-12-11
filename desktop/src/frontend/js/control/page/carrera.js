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

let id_carrera = null;

let loadEdit = (id) => {
    id_carrera = id;
    carreraDao.selectById(id).then((res) => {
        form.nombre.value = res[0].nombre;
    });
}

boton.onclick = () => {
    if (id_carrera === null) {
        insert();
    } else {
        update();
    }
}
form.onsubmit = (e) => {
    e.preventDefault();
    if (id_carrera === null) {
        insert();
    } else {
        update();
    }
}

let clearAll = () => {
    form.nombre.value = '';
    id_carrera = null;
}

let isFullForm = () => {
    if (form.nombre.value !== "" && form.nombre.value !== null) {
        return true;
    } else {
        return false;
    }
}


let insert = () => {
    if (isFullForm()) {


        carreraDao.insert(form.nombre.value).then((res) => {
            select();
            M.toast({
                html: 'Registro guardado!'
            });
            M.Modal.getInstance(document.getElementById("modal_formInsertUpdate")).close();
        });
    } else {
        M.toast({
            html: 'Llene todos los campos!'
        });
    }

}

let update = () => {
    if (isFullForm()) {
        carreraDao.update(id_carrera, form.nombre.value).then((res) => {
            select();
            M.toast({
                html: 'Registro actualizado!'
            });
            M.Modal.getInstance(document.getElementById("modal_formInsertUpdate")).close();
        });
    } else {
        M.toast({
            html: 'Llene todos los campos!'
        });
    }
}

let dell = (id) => {
    carreraDao.delete(id).then((res) => {
        select();
        M.toast({
            html: 'Registro eliminado!'
        });
    });
}

let select = () => {
    carreraDao.select().then((res) => {
        dataTable.clear();
        let tmp = [];
        for (let i of res) {     
            tmp.push([i.nombre, `
            <a onclick="loadEdit(${i.id_carrera})" href="#modal_formInsertUpdate" class="waves-effect waves-light btn modal-trigger">
                <i class="material-icons">create</i>
            </a>
            <a onclick="dell(${i.id_carrera})" class="waves-effect waves-light btn">
                <i class="material-icons">delete</i>
            </a>
            `]);
        }
        dataTable.rows.add(tmp).draw();
    });


}