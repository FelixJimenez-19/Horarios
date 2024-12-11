const data_rows = document.getElementById("data_rows");
const form = document.getElementById("form");
const boton = document.getElementById("boton");
// MODAL FORM CONFIG | INDEX
const elems_modal = document.querySelectorAll('#modal_formInsertUpdate');
const instances_modal = M.Modal.init(elems_modal, {
    onCloseEnd: () => clearAll()
});
// MODAL FORM CONFIG | END
// SELECT INPUT CONFIG | INDEX
const elems_select = document.querySelectorAll('select');
const instances_select = M.FormSelect.init(elems_select, {});
// SELECT INPUT CONFIG | END

window.onload = () => {
    select();
}

let id_ciclo = null;

let loadEdit = (id) => {
    loadSelects(() => {
        id_ciclo = id;
        cicloDao.selectById(id).then((res) => {
            form.nombre.value = res[0].nombre;
            form.id_carrera.value = res[0].id_carrera;
        });
    });
}

boton.onclick = () => {
    if (id_ciclo === null) {
        insert();
    } else {
        update();
    }
}

let clearAll = () => {
    form.nombre.value = '';
    form.id_carrera.value = '';
    id_ciclo = null;
}

let isFullForm = () => {
    if (
        form.nombre.value !== "" && form.nombre.value !== null &&
        form.id_carrera.value !== "" && form.id_carrera.value !== null
    ) {
        return true;
    } else {
        return false;
    }
}


let insert = () => {
    if (isFullForm()) {
        cicloDao.insert(form.nombre.value, form.id_carrera.value).then((res) => {
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
        cicloDao.update(id_ciclo, form.nombre.value, form.id_carrera.value).then((res) => {
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
    cicloDao.delete(id).then((res) => {
        select();
        M.toast({
            html: 'Registro eliminado!'
        });
    });
}

let select = () => {
    cicloDao.selectJoinCarrera().then((res) => {
        dataTable.clear();
        let tmp = [];
        for (let i of res) {
            tmp.push([i.ciclo_nombre,i.carrera_nombre, `
            <a onclick="loadEdit(${i.ciclo_id})" href="#modal_formInsertUpdate" class="waves-effect waves-light btn modal-trigger">
            <i class="material-icons">create</i>
        </a>
        <a onclick="dell(${i.ciclo_id})" class="waves-effect waves-light btn">
            <i class="material-icons">delete</i>
        </a>     
            `]);
        }
        dataTable.rows.add(tmp).draw();
    });


}






let loadSelects = (action) => {
    let tmp = '<option value="">Selecciona una opcion</option>';
    carreraDao.select().then((res) => {
        for (let i of res) {
            tmp += `<option value="${i.id_carrera}">${i.nombre}</option>`;
        }
        form.id_carrera.innerHTML = tmp;
        M.FormSelect.init(document.getElementById("select_id_carrera"), {});
        action();
    });
}