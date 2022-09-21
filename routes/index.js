var express = require('express');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { checaUsuario } = require("../db/mongo");
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
      const match = await bcrypt.compare(password, obj.pass);

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

// INICIAR SESIÓN
router.post("/",
  passport.authenticate("local", { failureRedirect: "/?errLI=1" }),
  function (req, res) {
    if (req.user.type === "coordi") {
      res.redirect("/coordi?hello=1");
    } else if (req.user.type === "maestro") {
      // FIXME:
      res.redirect(`/users/maestro?user=${req.user.type}&hello=2`);
    } else {
      // FIXME:
      res.redirect(`/users/alumno?user=${req.user.type}&hello=2`);
    }
  }
)

module.exports = router;
