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

let id_docente = null;

let loadEdit = (id) => {
    id_docente = id;
    docenteDao.selectById(id).then((res) => {
        form.nombre.value = res[0].nombre;
        form.apellido.value = res[0].apellido;
        form.color.value = res[0].color;

    });
}

boton.onclick = () => {
    if (id_docente === null) {
        insert();
    } else {
        update();
    }
}

let clearAll = () => {
    form.nombre.value = '';
    form.apellido.value = '';
    form.color.value = '';
    id_docente = null;
}

let isFullForm = () => {
    if (
        form.nombre.value !== "" && form.nombre.value !== null &&
        form.apellido.value !== "" && form.apellido.value !== null &&
        form.color.value !== "" && form.color.value !== null

    ) {
        return true;
    } else {
        return false;
    }
}


let insert = () => {
    if (isFullForm()) {


        docenteDao.insert(form.nombre.value, form.apellido.value, form.color.value).then((res) => {
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
        docenteDao.update(id_docente, form.nombre.value, form.apellido.value, form.color.value).then((res) => {
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
    docenteDao.delete(id).then((res) => {
        select();
        M.toast({
            html: 'Registro eliminado!'
        });
    });
}

let select = () => {
    docenteDao.select().then((res) => {
        dataTable.clear();
        let tmp = [];
        for (let i of res) {
            tmp.push([i.nombre,i.apellido, `<div class="z-depth-2" style="width:35px; height:35px; border-radius:50%; background:${i.color};" ></div>`,`
            <a onclick="loadEdit(${i.id_docente})" href="#modal_formInsertUpdate" class="waves-effect waves-light btn modal-trigger">
                                <i class="material-icons">create</i>
                            </a>
                            <a onclick="dell(${i.id_docente})" class="waves-effect waves-light btn">
                                <i class="material-icons">delete</i>
                            </a>
                        `]);
        }
        dataTable.rows.add(tmp).draw();
    });


}