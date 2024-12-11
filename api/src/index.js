const express = require('express');
const morgan = require('morgan');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);
//app.set('port', 3000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Allow', 'GET, POST, PUT, DELETE');
    next();
});

//routes
app.use(require('./routes/usuario'));
app.use(require('./routes/periodo'));
app.use(require('./routes/formato'));
app.use(require('./routes/docente'));
app.use(require('./routes/carrera'));
app.use(require('./routes/ciclo'));
app.use(require('./routes/materia'));
app.use(require('./routes/paralelo'));
app.use(require('./routes/horario'));

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});