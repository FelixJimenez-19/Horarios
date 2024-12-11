const data_rows = document.getElementById("data_rows");
const form = document.getElementById("form");
const boton = document.getElementById("boton");
const boton_pass = document.getElementById("boton_pass");
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

let id_usuario = null;



boton.onclick = () => {
    if (id_usuario === null) {
        insert();
    } else {
        update();
    }
}

boton_pass.onclick = () => {
    if (form.pass.type === "password") {
        form.pass.type = "text";
        boton_pass.innerHTML = ` <i class="material-icons">visibility_off</i>`;
    } else {
        form.pass.type = "password";
        boton_pass.innerHTML = ` <i class="material-icons">visibility</i>`;
    }

}


let loadEdit = (id) => {
    id_usuario = id;
    usuarioDao.selectById(id).then((res) => {
        form.nombre.value = res[0].nombre;
        form.user.value = res[0].user;
        form.pass.value = res[0].pass;

    });
}

let clearAll = () => {
    form.nombre.value = '';
    form.user.value = '';
    form.pass.value = '';
    id_usuario = null;
}

let isFullForm = () => {
    if (
        form.nombre.value !== "" && form.nombre.value !== null &&
        form.user.value !== "" && form.user.value !== null &&
        form.pass.value !== "" && form.pass.value !== null

    ) {
        return true;
    } else {
        return false;
    }
}


let insert = () => {
    if (isFullForm()) {


        usuarioDao.insert(form.nombre.value, form.user.value, form.pass.value).then((res) => {
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
        usuarioDao.update(id_usuario, form.nombre.value, form.user.value, form.pass.value).then((res) => {
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
    usuarioDao.delete(id).then((res) => {
        select();
        M.toast({
            html: 'Registro eliminado!'
        });
    });
}

let select = () => {
    usuarioDao.select().then((res) => {
        dataTable.clear();
        let tmp = [];
        for (let i of res) {
            tmp.push([i.nombre, i.user, `
            <td>
            <a onclick="loadEdit(${i.id_usuario})" href="#modal_formInsertUpdate" class="waves-effect waves-light btn modal-trigger">
                <i class="material-icons">create</i>
            </a>
            <a onclick="dell(${i.id_usuario})" class="waves-effect waves-light btn">
                <i class="material-icons">delete</i>
            </a> 
            `]);
        }

        dataTable.rows.add(tmp).draw();
    });


}