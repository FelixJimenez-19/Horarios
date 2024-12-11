window.onload = () => {
    main();
}
let main = () => {
    let materia, paralelo, periodo;
    materiaDao.selectJoinDocenteCicloCarreraParalelo().then((res) => {
        materia = res;
        paraleloDao.selectJoinCicloCarrera().then((res) => {
            paralelo = res;
            periodoDao.selectById(1).then((res) => {
                //console.log(res);
                periodo = res;
                generate(materia, paralelo, periodo);
            });
        });
    });
}

let generate = (materia, paralelo, periodo) => {
    if (_horario.isCorrectHours(materia, paralelo, periodo)) {
        let horarios = _horario.generateHorario(materia, paralelo, periodo);
        
console.log(horarios);
        printTable(horarios);
        
        console.log("locas os men ");
    }
}
let printTable = (horarios) => {
    const tables = document.getElementById('tables');
    tables.innerHTML = '';
    for (let i of horarios) {
        tables.innerHTML += _horario.convertToTable(i);
          
    }
}