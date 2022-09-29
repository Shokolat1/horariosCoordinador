var express = require('express');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require('bcrypt')
const { checaUsuario, client } = require("../db/mongo");
var router = express.Router();

// Estrategia Local
// TODO:
passport.use(new LocalStrategy({
  usernameField: "matricula",
  passwordField: "password",
},
  async function (username, password, done) {
    const obj = await checaUsuario(username)
    if (!obj) {
      client.close()
      return done(null, false);
    } else {
      const match = await bcrypt.compare(password, obj.password);

      // CHECAR SI LA CONTRASEÑA EN EL FORMULARIO Y LA DB SON LAS MISMAS,
      // Y SI EL USUARIO ESTÁ ACTIVO
      if (match && obj.estado == 'activo') {
        return done(null, obj);
      }

      client.close()
      return done(null, false);
    }
  }
));

// Serializar Usuario
passport.serializeUser(function (user, done) {
  done(null, user);
});

/* Página Inicio de Sesión */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Inicio de Sesión' });
});

router.get('/logout', async function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect("/");
  });
})

// INICIAR SESIÓN
router.post("/",
  passport.authenticate("local", { failureRedirect: "/" }),
  function (req, res) {
    if (req.user.tipo === "coordi") {
      res.redirect("/coordi/nuevoAl");
    } else {
      res.redirect(`/users/?tipo=${req.user.tipo}&matricula=${req.user.matricula}`);
    }
  }
)

module.exports = router;
