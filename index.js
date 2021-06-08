const express = require('express');
const routes = require('./routes');
const path = require('path');//nativo de node para entrar a leer el filesystem
const bodyParser = require('body-parser');
//helper
const helpers = require('./helpers');
//creando la conexion a la base de datos
const db = require('./config/db');
//importando modelo para hacer la migracion desde sequilaze
require('./models/Proyectos');
//con stnc hago migracion, con authenticate me conecto a una existente
db.sync()
  .then(() => console.log('Conectado al servidor'))
  .catch(error => console.log(error));

//creando serivor
const app = express();
//carga de files estaticos
app.use(express.static('public'));
//configura motor de vistas
app.set('view engine', 'pug');
//carga las vistas
app.set('views', path.join(__dirname, './views'));
//pasar vardupm a applicacion
app.use((req, res, next) => {
  //disponible para toda la aplicacion
  res.locals.vardump = helpers.vardupm;
  next();
});
//habilitando Bodyparser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
/*app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));*/
//carga rutas
app.use('/', routes());

app.listen(3007);


