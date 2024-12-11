// import { closeSync } from "fs";

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

let id_materia = null;

let loadEdit = (id) => {
    loadSelects(() => {
        id_materia = id;
        materiaDao.selectById(id).then((res) => {
            form.nombre.value = res[0].nombre;
            form.nhps.value = res[0].nhps;
            form.id_docente.value = res[0].id_docente;
            form.id_ciclo.value = res[0].id_ciclo;
        });
    });
}

boton.onclick = () => {
    if (id_materia === null) {
        insert();
    } else {
        update();
    }
}

let clearAll = () => {
    form.nombre.value = '';
    form.id_ciclo.value = '';
    id_materia = null;
}

let isFullForm = () => {
    if (
        form.nombre.value !== "" && form.nombre.value !== null &&
        form.nhps.value !== "" && form.nhps.value !== null &&
        form.id_docente.value !== "" && form.id_docente.value !== null &&
        form.id_ciclo.value !== "" && form.id_ciclo.value !== null
    ) {
        return true;
    } else {
        return false;
    }
}


let insert = () => {
    if (isFullForm()) {
        materiaDao.insert(form.nombre.value,form.nhps.value,form.id_docente.value, form.id_ciclo.value).then((res) => {
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
        materiaDao.update(id_materia, form.nombre.value,form.nhps.value,form.id_docente.value, form.id_ciclo.value).then((res) => {
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
    materiaDao.delete(id).then((res) => {
        select();
        M.toast({
            html: 'Registro eliminado!'
        });
    });
}

let select = () => {
    materiaDao.selectJoinCicloDocenteCarrera().then((res) => {
        dataTable.clear();
        let tmp = [];
        for (let i of res) {
            tmp.push([i.materia_nombre,i.materia_nhps ,`<div class="z-depth-2" style="display:inline-block; width:20px; height:20px; border-radius:50%; background:${i.docente_color};" ></div> ${i.docente_nombre } ${i.docente_apellido}`,
                           i.ciclo_nombre,i.carrera_nombre, ` 
                            <a onclick="loadEdit(${i.materia_id})" href="#modal_formInsertUpdate" class="waves-effect waves-light btn modal-trigger">
                                <i class="material-icons">create</i>
                            </a>
                            <a onclick="dell(${i.materia_id})" class="waves-effect waves-light btn">
                                <i class="material-icons">delete</i>
                            </a>
                            `]);
        }
        dataTable.rows.add(tmp).draw();
    });


}






let loadSelects = (action) => {
    let tmp = "";
    docenteDao.select().then((res) => {
        tmp = '<option value="">Selecciona una opcion</option>';
        for (let i of res) {
            tmp += `<option value="${i.id_docente}">${i.nombre} ${i.apellido}</option>`;
        }
        form.id_docente.innerHTML = tmp;
        M.FormSelect.init(document.getElementById("select_id_docente"), {});
        tmp = '<option value="">Selecciona una opcion</option>';
        cicloDao.selectJoinCarrera().then((res) => {
            for (let i of res) {
                tmp += `<option value="${i.ciclo_id}">${i.ciclo_nombre} | ${i.carrera_nombre}</option>`;
            }
            form.id_ciclo.innerHTML = tmp;
            M.FormSelect.init(document.getElementById("select_id_ciclo"), {});
            action();
        });
    });
}