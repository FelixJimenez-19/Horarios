const backend = require('electron').remote.require('./index');

window.onload = () => {
    const load = document.getElementById("loader");
    const form = document.getElementById("form");
    const user = form.user;
    const pass = form.pass;
    user.focus();
    form.onsubmit = (event) => {
        event.preventDefault();
        if(user.value !== "" && pass.value !== "") {
            load.style.display = "block";
            usuarioDao.login(user.value, pass.value).then((res) => {
                if(res[0]) {
                    if(res[0].user === user.value && res[0].pass === pass.value) {
                        user.value = "";
                        pass.value = "";
                        user.focus();
                        backend.login(res[0]);
                    } else {
                        M.toast({html: 'Datos incorrectos!'});
                    }
                } else {
                    M.toast({html: 'Datos incorrectos!'});
                }
                load.style.display = "none";
            }).catch((err) => {
                load.style.display = "none";
                M.toast({html: 'Error al conectar!'});
            });
        } else {
            M.toast({html: 'Llene los campos!'});
        }
    }
}