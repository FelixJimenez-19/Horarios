const backend = require('electron').remote.require('./index');
window.onload = () => {
    const contentPage = document.getElementById("contentPage");
    let loadPage = (page) => contentPage.src = "./page/" + page;
    
    document.getElementById("boton_usuario").onclick = () => loadPage('usuario.html');
    document.getElementById("boton_periodo").onclick = () => loadPage('periodo.html');
    document.getElementById("boton_formato").onclick = () => loadPage('modelo.html');
    document.getElementById("boton_docente").onclick = () => loadPage('docente.html');
    document.getElementById("boton_carrera").onclick = () => loadPage('carrera.html');
    document.getElementById("boton_ciclo").onclick = () => loadPage('ciclo.html');
    document.getElementById("boton_paralelo").onclick = () => loadPage('paralelo.html');
    document.getElementById("boton_materia").onclick = () => loadPage('materia.html');
    document.getElementById("boton_horario").onclick = () => loadPage('horario.html');
    document.getElementById("boton_perfil").onclick = () => loadPage('perfil.html');
    document.getElementById("boton_logout").onclick = () => backend.logout();;
    
    loadSession();

    setTimeout(() => document.getElementById("content_load").style.left = '-100%', 3000);
}
loadSession = () => {
    let session = backend.getSession();
    document.getElementById("profile_name").innerHTML = session.nombre;
}