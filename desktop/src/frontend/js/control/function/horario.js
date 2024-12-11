



_horario = {
    //Function
    //periodo = selectWhere: id_periodo
    //paralelo[] = renderMateriaParalelo()[]
    isCorrectHours: (materia, paralelo, periodo) => {
        paralelo = _horario.renderMateriaParalelo(materia, paralelo);
        periodo = JSON.parse(periodo[0].horario);
        let nhps = parseInt(periodo.dia.length) * parseInt(periodo.nhpd);
        for (let i in paralelo) {
            let tmp_nhps = parseInt(paralelo[i].paralelo_nhps);
            if (tmp_nhps > nhps) {
                // Hay mas horas de las necesarias
                console.log("Muchas horas");
                return false;
            } else if (tmp_nhps < nhps) {
                // Hay menos horas de las necesarias
                console.log("Menos horas");
                return false;
            }
        }
        // Todo correcto y yo que me alegro
        return true;
    },

    //Function
    //periodo = selectWhere: id_periodo
    //paralelo[] = renderMateriaParalelo()[]







    generateHorario: (materia, paralelo, periodo) => {
        paralelo = _horario.renderMateriaParalelo(materia, paralelo);
        //SubFunction
        //dia[] = (GrupMateria)
        let getWeek = (dia) => {
            let week = [];
            for (let a in dia[0]) {
                let hora_temp = [];
                let dia_temp = '';
                for (let b in dia) {
                    dia_temp = dia[b][a].dia;
                    hora_temp.push({
                        hora: dia[b][a].hora,
                        materia: dia[b][a].materia,
                        materia_id: dia[b][a].materia_id,
                        docente: dia[b][a].docente,
                        docente_id: dia[b][a].docente_id
                    });
                }
                // week.push(JSON.parse(`
                //     {" ${ dia_temp.toLowerCase() } ": ${JSON.stringify(hora_temp)} }
                // `));
                week.push(JSON.parse(`{"dia":"${dia_temp.toLowerCase()}","materia":${JSON.stringify(hora_temp)}}`));
            }
            return week;
        }
        
        //generateHorario
        let horario = [];
        for (let a in paralelo) {
            let materia_index = 0;
            let materia_nhps = paralelo[a].materia[materia_index].materia_nhps;
            let dia = [];

            let periodo_tmp = JSON.parse(periodo[0].horario);
            for (let b = 0; b < periodo_tmp.nhpd; b++) {
                let hora = [];
                for (let c in periodo_tmp.dia) {
                    if (materia_nhps <= 0) {
                        materia_index++;
                        materia_nhps = paralelo[a].materia[materia_index].materia_nhps;
                    }
                    hora.push({
                        hora: b + 1,
                        dia: periodo_tmp.dia[c],
                        materia: paralelo[a].materia[materia_index].materia_nombre,
                        materia_id: paralelo[a].materia[materia_index].materia_id,
                        docente: paralelo[a].materia[materia_index].docente_nombre,
                        docente_id: paralelo[a].materia[materia_index].docente_id,
                    });
                    materia_nhps--;
                }
                dia.push(hora);
            }
            horario.push({
                paralelo_id: paralelo[a].paralelo_id,
                paralelo_nombre: paralelo[a].paralelo_nombre,
                carrera_nombre: paralelo[a].carrera_nombre,
                ciclo_nombre: paralelo[a].ciclo_nombre,
                periodo_id: periodo[0].id_periodo,
                horario: getWeek(dia)
            });
        }
        return _horario.resolve(horario);

    },
    // generateHorario: (materia, paralelo, periodo) => {
    //     paralelo = _horario.renderMateriaParalelo(materia, paralelo);
    //     //SubFunction
    //     //dia[] = (GrupMateria)
    //     let getWeek = (dia) => {
    //         let week = [];
    //         for (let a in dia[0]) {
    //             let hora_temp = [];
    //             let dia_temp = '';
    //             for (let b in dia) {
    //                 dia_temp = dia[b][a].dia;
    //                 hora_temp.push({
    //                     hora: dia[b][a].hora,
    //                     materia: dia[b][a].materia,
    //                     materia_id: dia[b][a].materia_id,
    //                     docente: dia[b][a].docente,
    //                     docente_id: dia[b][a].docente_id
    //                 });
    //             }
    //             week.push(JSON.parse(`
    //                 {" ${ dia_temp.toLowerCase() } ": ${ JSON.stringify(hora_temp)  }}
    //             `));
    //         }
    //         return week;
    //     }
    //     //generateHorario
    //     let horario = [];
    //     for (let a in paralelo) {
    //         let materia_index = 0;
    //         let materia_nhps = paralelo[a].materia[materia_index].materia_nhps;
    //         let dia = [];
    //         for (let b = 0; b < periodo.horario.nhpd; b++) {
    //             let hora = [];
    //             for (let c in periodo.horario.dia) {
    //                 if (materia_nhps <= 0) {
    //                     materia_index++;
    //                     materia_nhps = paralelo[a].materia[materia_index].materia_nhps;
    //                 }
    //                 hora.push({
    //                     hora: b + 1,
    //                     dia: periodo.horario.dia[c],
    //                     materia: paralelo[a].materia[materia_index].materia_nombre,
    //                     materia_id: paralelo[a].materia[materia_index].materia_id,
    //                     docente: paralelo[a].materia[materia_index].docente_nombre,
    //                     docente_id: paralelo[a].materia[materia_index].docente_id,
    //                 });
    //                 materia_nhps--;
    //             }
    //             dia.push(hora);
    //         }
    //         horario.push({
    //             paralelo_id: paralelo[a].paralelo_id,
    //             paralelo_nombre: paralelo[a].paralelo_nombre,
    //             carrera_nombre: paralelo[a].carrera_nombre,
    //             ciclo_nombre: paralelo[a].ciclo_nombre,
    //             periodo_id: periodo.id_periodo,
    //             horario: getWeek(dia)
    //         });
    //     }
    //     return _horario.resolve(horario);

    // },

    //Function
    //horario = generateHorario()
    convertToTable: (horario) => {
        
        let tables_temp = `<b>${ horario.carrera_nombre } ${ horario.ciclo_nombre } ${ horario.paralelo_nombre }</b><table><tr><td></td>`;
        
        for (let b of horario.horario[0][Object.keys(horario.horario[0])[0]]) {
            tables_temp += `<td><center><b>${b.hora}</b></center></td>`;
            
        }
        tables_temp += `</tr>`;
        for (let b in horario.horario) {
            let index = Object.keys(horario.horario[b])[0];
            
            tables_temp += `<tr><td><b>${ index.toUpperCase() }</b></td>`;
            for (let c of horario.horario[b][index]) {
                tables_temp += `<td>${c.materia}<br>${c.docente}</td>`;
            }
            tables_temp += `</tr>`;
        }
        tables_temp += `</table><br><br><br><br>`;
        return tables_temp;
    },

    //OTHER FUNCTIONS___________________________________________________________________________________
    //Function
    //materia[] = selectJoin: docente, ciclo, carrera, paralelo
    //paralelo[] = selectJoin: ciclo, carrera
    renderMateriaParalelo: (materia, paralelo) => {
        let paralelo_temp = [];
        for (let i in paralelo) {
            let materia_temp = [];
            let sum_nhps = 0;
            for (let j in materia) {
                if (paralelo[i].paralelo_id === materia[j].paralelo_id) {
                    materia_temp.push(materia[j]);
                    sum_nhps += materia[j].materia_nhps;
                }
            }
            paralelo_temp.push({
                paralelo_id: paralelo[i].paralelo_id,
                paralelo_nombre: paralelo[i].paralelo_nombre,
                paralelo_nhps: sum_nhps,
                carrera_id: paralelo[i].carrera_id,
                carrera_nombre: paralelo[i].carrera_nombre,
                ciclo_id: paralelo[i].ciclo_id,
                ciclo_nombre: paralelo[i].ciclo_nombre,
                materia: materia_temp
            });
        }
        return paralelo_temp;
    },
    resolve: (horarios) => {
        //console.log(horarios);
        for (let a = 0; a < horarios.length; a++) {
            for (let b in horarios[a].horario) {
                for (let c in horarios[a].horario[b].materia) {
                    for (let d = 0; d < horarios.length; d++) {
                        if (horarios[a].horario[b].materia[c].docente.toLowerCase() === horarios[d].horario[b].materia[c].docente.toLowerCase()) {
                            _horario.findMove(horarios, a, b, c);
                        }
                    }
                }
            }
        }
        _horario.printEquals(horarios);
        // if (_horario.isResolve(horarios)) {
        //     return horarios;
        // } else {
        //     return _horario.resolve(horarios);
        // }
        //console.log(_horario.isResolve(horarios));
        return horarios;
    },
    // resolve: (horarios) => {
    //     for (let a = 0; a < horarios.length; a++) {
    //         for (let b in horarios[a].horario) {
    //             for (let c in horarios[a].horario[b]) {
    //                 for (let d in horarios[a].horario[b][c]) {
    //                     for (let e = 0; e < horarios.length; e++) {
    //                         if (horarios[a].horario[b][c][d].docente === horarios[e].horario[b][c][d].docente && a !== e) {
    //                             _horario.findMove(horarios, a, b, c, d);
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     if (_horario.isResolve(horarios)) {
    //         _horario.printEquals(horarios);
    //         return horarios;
    //     } else {
    //         return _horario.resolve(horarios);
    //     }
    // },
    findMove: (horarios, a, b, c) => {
        for (let i1 in horarios[a].horario) {
            for (let i2 in horarios[a].horario[i1].materia) {
                let tmp = false;
                for (let i3 in horarios) {
                    if (horarios[a].horario[b].materia[c].docente === horarios[i3].horario[i1].materia[i2].docente) {
                        tmp = true;
                    }
                }
                if (!tmp) {
                    _horario.invert(horarios[a].horario[b].materia[c], horarios[a].horario[i1].materia[i2]);
                    for (let i3 in horarios) {
                        if (horarios[a].horario[i1].materia[i2].docente.toLowerCase() === horarios[i3].horario[b].materia[c].docente.toLowerCase()) {
                            _horario.findMove(horarios, a, i1, i2);
                        }
                    }
                    return;
                }
            }
            
        }
        // for (let i1 in horarios[a].horario) {
        //     for (let i2 in horarios[a].horario[i1]) {
        //         for (let i3 in horarios[a].horario[i1][i2]) {
        //             let tmp = false;
        //             for (let e in horarios) {
        //                 if (horarios[a].horario[b][c][d].docente === horarios[e].horario[i1][i2][i3].docente) {
        //                     tmp = true;
        //                 }
        //             }
        //             if (!tmp) {
        //                 _horario.invert(horarios[a].horario[b][c][d], horarios[a].horario[i1][i2][i3]);
        //                 for (let e in horarios) {
        //                     if (horarios[a].horario[i1][i2][i3].docente === horarios[e].horario[b][c][d].docente) {
        //                         _horario.findMove(horarios, a, i1, i2, i3);
        //                     }
        //                 }
        //                 return;
        //             }
        //         }
        //     }
        // }
    },
    // findMove: (horarios, a, b, c, d) => {
    //     for (let i1 in horarios[a].horario) {
    //         for (let i2 in horarios[a].horario[i1]) {
    //             for (let i3 in horarios[a].horario[i1][i2]) {
    //                 let tmp = false;
    //                 for (let e in horarios) {
    //                     if (horarios[a].horario[b][c][d].docente === horarios[e].horario[i1][i2][i3].docente) {
    //                         tmp = true;
    //                     }
    //                 }
    //                 if (!tmp) {
    //                     _horario.invert(horarios[a].horario[b][c][d], horarios[a].horario[i1][i2][i3]);
    //                     for (let e in horarios) {
    //                         if (horarios[a].horario[i1][i2][i3].docente === horarios[e].horario[b][c][d].docente) {
    //                             _horario.findMove(horarios, a, i1, i2, i3);
    //                         }
    //                     }
    //                     return;
    //                 }
    //             }
    //         }
    //     }
    // },
    isResolve: (horarios) => {
        for (let a = 0; a < horarios.length; a++) {
            for (let b in horarios[a].horario) {
                for (let c in horarios[a].horario[b].materia) {
                    for (let d = 0; d < horarios.length; d++) {
                        if (horarios[a].horario[b].materia[c].docente === horarios[d].horario[b].materia[c].docente) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    },
    // isResolve: (horarios) => {
    //     for (let a = 0; a < horarios.length; a++) {
    //         for (let b in horarios[a].horario) {
    //             for (let c in horarios[a].horario[b]) {
    //                 for (let d in horarios[a].horario[b][c]) {
    //                     for (let e = 0; e < a; e++) {
    //                         if (horarios[a].horario[b][c][d].docente === horarios[e].horario[b][c][d].docente) {
    //                             return false;
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return true;
    // },
    printEquals: (horarios) => {
        let error = false;
        for (let a = 0; a < horarios.length; a++) {
            for (let b in horarios[a].horario) {
                for (let c in horarios[a].horario[b].materia) {
                    for (let d = 0; d < horarios.length; d++) {
                        if (horarios[a].horario[b].materia[c].docente === horarios[d].horario[b].materia[c].docente) {
                            // console.log("Hora: " + horarios[a].horario[b].materia[c].hora);
                            // console.log("Materia 1: " + horarios[a].horario[b].materia[c].materia);
                            // console.log("Materia 2: " + horarios[d].horario[b].materia[c].materia);
                            // console.log("Docente: " + horarios[a].horario[b].materia[c].docente);
                            error = true;
                        }
                    }
                }
            }
        }
        (error) ? console.log("Hubo incidencias.."): console.log("No hubieron incidencias..");;
    },
    invert: (materia1, materia2) => {
        let tmp_materia = materia1.materia;
        let tmp_docente = materia1.docente;
        materia1.materia = materia2.materia;
        materia1.docente = materia2.docente;
        materia2.materia = tmp_materia;
        materia2.docente = tmp_docente;
    }
}