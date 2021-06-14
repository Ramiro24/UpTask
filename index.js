const express = require('express');
const routes = require('./routes');
const path = require('path');
const helpers = require('./helpers');
const db = require('./config/db');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
//importar las variables
require('dotenv').config({ path: 'variables.env' });

//importando modelo para hacer la migracion desde sequilaze
require('./models/Proyectos');
require('./models/Tareas');
require('./models/usuarios');

db.sync()
  .then(() => console.log('Conectado al servidor'))
  .catch(error => console.log(error));

//creando servidor
const app = express();
//carga de files estaticos
app.use(express.static('public'));
//configura motor de vistas
app.set('view engine', 'pug');
//habilitando Bodyparser para leer datos del formulario
app.use(express.urlencoded({extended: true}));
//carga las vistas
app.set('views', path.join(__dirname, './views'));
//agregar flash messages
app.use(flash());
app.use(cookieParser());
//sessiones permite navegar entre distintas pagimas
app.use(session({
  secret: 'supersecreto',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
//pasar vardupm a applicacion
app.use((req, res, next) => {
  //disponible para toda la aplicacion
  res.locals.vardump = helpers.vardupm;
  res.locals.mensajes = req.flash();
  res.locals.usuario = {...req.user} || null;
  next(); 
});
//carga rutas
app.use('/', routes());

//sevidor y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, ()=>{
  console.log('El servidor esta funcionando')
});


