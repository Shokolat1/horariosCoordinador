var express = require('express');
const passport = require("passport");
const { connectToAcc, nuevoAl, nuevoMto, nuevaMateria, estableceFechas, dameFechas, dameClases, dameProfes, creaHorarioAl, client } = require("../db/mongo");
const isAuth = require('../lib/isAuth')
var router = express.Router();

// Deserializar Usuario
passport.deserializeUser(async function (id, done) {
  await connectToAcc()
    .then(({ collection }) => {
      collection.findOne({ student: id }, function (err, user) {
        done(err, user);
      });
    })
});

/*
  RUTAS GET -------------------------------------------------------------------------------
*/

// Vista Horarios Alumnos
router.get('/horarioAl', isAuth, async (req, res) => {
  if (req.user.tipo != "coordi") {
    res.redirect(`/users/?tipo=${req.user.tipo}&matricula=${req.user.matricula}`);
  }

  let carrera = req.query.carr
  let semestre = req.query.sem
  let xSem

  if (semestre < 5) xSem = true
  else xSem = false

  let clases = await dameClases(semestre, carrera)
  let fechas = await dameFechas()
  let profes = await dameProfes()

  if (!clases || !fechas) {
    console.log(err)
    res.redirect('/coordi/InterAlumn')
  }

  res.render('horarios', { title: 'Crear Horarios de Alumnos', fechas, carrera, semestre, clases, xSem, profes });
  client.close()
})

// Vista Horarios Alumnos
router.get('/InterAlumn', isAuth, (req, res) => {
  if (req.user.tipo != "coordi") {
    res.redirect(`/users/?tipo=${req.user.tipo}&matricula=${req.user.matricula}`);
  }

  res.render('InterAlumn', { title: 'Crear Horarios de Alumnos' });
})

router.get('/InterMto', isAuth, (req, res) => {
  if (req.user.tipo != "coordi") {
    res.redirect(`/users/?tipo=${req.user.tipo}&matricula=${req.user.matricula}`);
  }

  res.render('InterMto', { title: 'Crear Horarios de Maestros' });
})

// Vista Horarios Maestros
router.get('/horarioMto', isAuth, async (req, res) => {
  if (req.user.tipo != "coordi") {
    res.redirect(`/users/?tipo=${req.user.tipo}&matricula=${req.user.matricula}`);
  }

  await dameFechas()
    .then((fechas) => {
      res.render('horarioMto', { title: 'Crear Horarios de Maestros', fechas: fechas });
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/coordi/InterAlumn')
    })
    .finally(() => {
      client.close()
    })
})

// Vista Creación Cuentas Alumnos
router.get('/nuevoAl', isAuth, (req, res) => {
  if (req.user.tipo != "coordi") {
    res.redirect(`/users/?tipo=${req.user.tipo}&matricula=${req.user.matricula}`);
  }

  res.render('registerStudent', { title: 'Registrar Cuenta de Alumno' });
})

// Vista Creación Cuentas Maestros
router.get('/nuevoMto', isAuth, (req, res) => {
  if (req.user.tipo != "coordi") {
    res.redirect(`/users/?tipo=${req.user.tipo}&matricula=${req.user.matricula}`);
  }

  res.render('registerMaestros', { title: 'Registrar Cuenta de Maestro' });
})

// Vista Agregar/Eliminar Materias
router.get('/nuevasMaterias', isAuth, (req, res) => {
  if (req.user.tipo != "coordi") {
    res.redirect(`/users/?tipo=${req.user.tipo}&matricula=${req.user.matricula}`);
  }

  res.render('registerMaterias', { title: 'Materias' });
})

// Vista Crear Tabla de Inicio y Fin de Semestre
router.get('/fechas', isAuth, (req, res) => {
  if (req.user.tipo != "coordi") {
    res.redirect(`/users/?tipo=${req.user.tipo}&matricula=${req.user.matricula}`);
  }

  res.render('registerFechas', { title: 'Dias y Meses' });
})

// Vista Desactivar Cuentas de usuarios
router.get('/desactivarCuenta', isAuth, (req, res) => {
  if (req.user.tipo != "coordi") {
    res.redirect(`/users/?tipo=${req.user.tipo}&matricula=${req.user.matricula}`);
  }

  res.render('desactivaCuenta', { title: 'Desactivar Cuenta' });
})

// Vista Eliminar Materias
router.get('/desactivarMat', isAuth, (req, res) => {
  if (req.user.tipo != "coordi") {
    res.redirect(`/users/?tipo=${req.user.tipo}&matricula=${req.user.matricula}`);
  }

  res.render('desactivaMat', { title: 'Eliminar Materias' });
})

// Vista Info Alumnos y Editarla
router.get('/infoalumno', isAuth, (req, res) => {
  if (req.user.tipo != "coordi") {
    res.redirect(`/users/?tipo=${req.user.tipo}&matricula=${req.user.matricula}`);
  }

  res.render('infoAlumnos', { title: 'Información del Alumno' });
})

router.get('/infomaterias', isAuth, (req, res) => {
  if (req.user.tipo != "coordi") {
    res.redirect(`/users/?tipo=${req.user.tipo}&matricula=${req.user.matricula}`);
  }

  res.render('infoMaterias', { title: 'Información del Alumno' });
})


/*
  RUTAS POST -------------------------------------------------------------------------------
*/

// Creación de cuentas Alumnos
router.post('/nuevoAl', async (req, res) => {
  // TODO: Alertas
  await nuevoAl(req.body)
    .then(() => {
      res.redirect('/coordi/nuevoAl')
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/coordi/nuevoAl')
    })
    .finally(() => {
      client.close()
    })
})

// Creación de cuentas Maestros
router.post('/nuevoMto', async (req, res) => {
  // TODO: Alertas
  await nuevoMto(req.body)
    .then(() => {
      res.redirect('/coordi/nuevoMto')
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/coordi/nuevoMto')
    })
    .finally(() => {
      client.close()
    })
})

// Agregar Materias
router.post('/nuevasMaterias', async (req, res) => {
  await nuevaMateria(req.body)
    .then(() => {
      res.redirect('/coordi/InterAlumn')
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/coordi/InterAlumn')
    })
    .finally(() => {
      client.close()
    })
})

router.post('/horario', (req, res) => {
  // TODO:
})

router.post('/fechas', async (req, res) => {
  let anio = new Date().getFullYear()

  await estableceFechas(req.body, anio)
    .then(() => {
      res.redirect('/coordi/fechas')
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/coordi/fechas')
    })
    .finally(() => {
      client.close()
    })
})

router.post('/getHrAl', async (req, res) => {
  res.redirect(`/coordi/horarioAl?carr=${req.body.carrera}&sem=${req.body.semestre}`)
})

router.post('/creaHorarios', async (req, res) => {
  let anio = new Date().getFullYear()
  await creaHorarioAl(req.body, anio)
    .then(() => {
      res.redirect('/coordi/fechas')
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/coordi/fechas')
    })
    .finally(() => {
      client.close()
    })
})

module.exports = router;
