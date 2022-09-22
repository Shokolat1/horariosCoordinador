var express = require('express');
const passport = require("passport");
const { connectToAcc, checaUsuario, dameHrAl, client, dameFechas } = require("../db/mongo");
const isAuth = require('../lib/isAuth');
var router = express.Router();

// Deserializar Usuario
passport.deserializeUser(async function (id, done) {
  await connectToAcc()
    .then(({ collection }) => {
      collection.findOne({ matricula: id.matricula }, function (err, user) {
        done(err, user);
      });
    })
});

router.get('/', isAuth, async function (req, res, next) {
  if (req.user.tipo == "coordi") {
    res.redirect(`/coordi/horarioAl`);
  }

  let tipo = req.query.tipo
  let mat = req.query.matricula
  await checaUsuario(mat)
    .then((resp) => {
      res.redirect(`/users/muestraHr?tipo=${resp.tipo}&sem=${resp.semestre}&carr=${resp.carrera}&estado=${resp.estado}`)
    })
    .catch(() => {
      console.log('Kgaste')
    })
    .finally(() => {
      client.close()
    })
});

router.get('/muestraHr', isAuth, async (req, res) => {
  if (req.user.tipo == "coordi") {
    res.redirect(`/coordi/horarioAl`);
  }

  let tipo = req.query.tipo
  let sem = req.query.sem
  let carr = req.query.carr
  let estado = req.query.estado

  let mto
  if (tipo == "maestro") {
    mto = true
  } else {
    mto = false
  }

  if (estado != "activo") {
    res.redirect('/logout')
  }

  console.log('hola')
  if(tipo == "maestro"){
    console.log('mundo')
    res.redirect('/users/muestraHrMto')
    return
  }

  let fechas = await dameFechas()

  await dameHrAl(carr, sem)
    .then((resp) => {
      for (let i = 0; i < 9; i++) {
        let x = `f${i + 1}`
        resp[x] = resp[x].split(',')
      }
      console.log(resp)
      res.render('horarioAlumnos', { alldatos: resp, datos1: resp.f1, datos2: resp.f2, datos3: resp.f3, datos4: resp.f4, datos5: resp.f5, datos6: resp.f6, datos7: resp.f7, datos8: resp.f8, datos9: resp.f9, mto, fechas })
    })
})

router.get('/muestraHrMto', isAuth, (req, res) =>{
  if (req.user.tipo == "coordi") {
    res.redirect(`/coordi/horarioAl`);
  }

  res.render('mtoDentro')
})

module.exports = router;
