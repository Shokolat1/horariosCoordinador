var express = require('express');
const passport = require("passport");
const { connectToAcc } = require("../db/mongo");
const isAuth = require('../lib/isAuth')
var router = express.Router();

// Deserializar Usuario
passport.deserializeUser(async function (id, done) {
  await connectToAcc()
    .then(({ collection }) => {
      // FIXME:
      collection.findOne({ student: id }, function (err, user) {
        done(err, user);
      });
    })
});

/*
  RUTAS GET -------------------------------------------------------------------------------
*/

/* Vista Inicial Coordi */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Vista Horarios Alumnos
router.get('/horarioAl', (req, res) =>{
  res.render('horarios', { title: 'Crear Horarios de Alumnos' });
})

// Vista Horarios Maestros
router.get('/horarioMto', (req, res) =>{
  res.render('horarios', { title: 'Crear Horarios de Maestros' });
})

// Vista Creación Cuentas Alumnos
router.get('/nuevoAl', (req, res) =>{
  res.render('registerStudent', { title: 'Registrar Cuenta de Alumno' });
})

// Vista Creación Cuentas Maestros
router.get('/nuevoMto',isAuth, (req, res) =>{
  res.render('registerMaestros', { title: 'Registrar Cuenta de Maestro' });
})

// Vista Agregar/Eliminar Materias
router.get('/materias', (req, res) =>{
  res.render('registerMaterias', { title: 'Materias' });
})

// Vista Desactivar Cuentas de usuarios
router.get('/desactivar', (req, res) =>{
  // TODO: Crear vista desactivar cuenta de usuarios
  res.render('desactivar', { title: 'Materias' });
})

/*
  RUTAS POST -------------------------------------------------------------------------------
*/

// Creación de cuentas Alumnos
router.post('/nuevoAl', (req, res) => {
  // TODO:
})

// Creación de cuentas Maestros
router.post('/nuevoMto', (req, res) => {
  // TODO:
})

// Agregar Materias
router.post('/materias', (req, res) => {
  // TODO:
})

router.post('/horario', (req, res) => {
  // TODO:
})

module.exports = router;
