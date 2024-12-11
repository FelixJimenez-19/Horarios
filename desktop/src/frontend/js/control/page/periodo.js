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

let id_periodo = null;

let loadEdit = (id) => {
    id_periodo = id;
    periodoDao.selectById(id).then((res) => {
        let horario = JSON.parse(res[0].horario);
        form.horario_desde.value = (horario.dia[0]).toLowerCase();
        form.horario_hasta.value = (horario.dia[horario.dia.length - 1]).toLowerCase();
        form.periodo_desde.value = (res[0].nombre).split(" ")[0];
        form.periodo_hasta.value = (res[0].nombre).split(" ")[1];
        form.nhpd.value = parseInt(horario.nhpd);
    });
}

boton.onclick = () => {
    if (id_periodo === null) {
        insert();
    } else {
        update();
    }
}

let clearAll = () => {
    form.horario_desde.value = '';
    form.horario_hasta.value = '';
    form.periodo_desde.value = '';
    form.periodo_hasta.value = '';
    form.nhpd.value = '';
    id_periodo = null;
}

let isFullForm = () => {
    if (
        form.horario_desde.value !== "" && form.horario_desde.value !== null &&
        form.horario_hasta.value !== "" && form.horario_hasta.value !== null &&
        form.periodo_desde.value !== "" && form.periodo_desde.value !== null &&
        form.periodo_hasta.value !== "" && form.periodo_hasta.value !== null &&
        form.nhpd.value !== "" && form.nhpd.value !== null
    ) {
        return true;
    } else {
        return false;
    }
}

let getDias = () => {
    let getIndex = (dia) => {
        switch (dia) {
            case 'lunes':
                return 0;
            case 'martes':
                return 1;
            case 'miercoles':
                return 2;
            case 'jueves':
                return 3;
            case 'viernes':
                return 4;
            case 'sabado':
                return 5;
            case 'domingo':
                return 6;
        }
    }
    let getDia = (index) => {
        switch (index) {
            case 0:
                return 'lunes';
            case 1:
                return 'martes';
            case 2:
                return 'miercoles';
            case 3:
                return 'jueves';
            case 4:
                return 'viernes';
            case 5:
                return 'sabado';
            case 6:
                return 'domingo';
        }
    }
    let desde = form.horario_desde.value.toLowerCase();
    let hasta = form.horario_hasta.value.toLowerCase();
    if (desde === hasta) {
        return [desde];
    } else if (getIndex(desde) < getIndex(hasta)) {
        let res = [];
        for (let i = getIndex(desde); i <= getIndex(hasta); i++) {
            res.push(getDia(i));
        }
        return res;
    } else {
        let res = [];
        for (let i = getIndex(desde); i <= 6; i++) {
            res.push(getDia(i));
        }
        for (let i = 0; i <= getIndex(hasta); i++) {
            res.push(getDia(i));
        }
        return res;
    }
}

let insert = () => {
    if (isFullForm()) {
        if (parseInt(form.nhpd.value) <= 24) {
            let horario = {
                dia: getDias(),
                nhpd: parseInt(form.nhpd.value)
            };
            periodoDao.insert(form.periodo_desde.value + ' ' + form.periodo_hasta.value, JSON.stringify(horario)).then((res) => {
                select();
                M.toast({
                    html: 'Registro guardado!'
                });
                M.Modal.getInstance(document.getElementById("modal_formInsertUpdate")).close();
            });
        } else {
            M.toast({
                html: 'Maximo 24 horas!'
            });
        }
    } else {
        M.toast({
            html: 'Llene el formulario!'
        });
    }
}

let update = () => {
    if (isFullForm()) {
        if (parseInt(form.nhpd.value) <= 24) {
            let horario = {
                dia: getDias(),
                nhpd: parseInt(form.nhpd.value)
            };
            periodoDao.update(id_periodo, form.periodo_desde.value + ' ' + form.periodo_hasta.value, JSON.stringify(horario)).then((res) => {
                select();
                M.toast({
                    html: 'Registro actualizado!'
                });
                M.Modal.getInstance(document.getElementById("modal_formInsertUpdate")).close();
            });
        } else {
            M.toast({
                html: 'Maximo 24 horas!'
            });
        }
    } else {
        M.toast({
            html: 'Llene el formulario!'
        });
    }
}

let dell = (id) => {
    periodoDao.delete(id).then((res) => {
        select();
        M.toast({
            html: 'Registro eliminado!'
        });
    });
}

let select = () => {
    periodoDao.select().then((res) => {
        dataTable.clear();
        let tmp = [];

        for (let i of res) {
            let horario = JSON.parse(i.horario);
            console.log(horario);
            let xd='';
            for (let j of horario.dia) {
              xd += `${j}, `;
            }
            tmp.push([i.nombre, xd, horario.nhpd ,`
            <a onclick="loadEdit(${i.id_periodo})" href="#modal_formInsertUpdate" class="waves-effect waves-light btn modal-trigger">
            <i class="material-icons">create</i>
        </a>
        <a onclick="dell(${i.id_periodo})" class="waves-effect waves-light btn">
            <i class="material-icons">delete</i>
        </a>
            `]);
        }
        dataTable.rows.add(tmp).draw();
    });
}