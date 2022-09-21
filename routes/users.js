var express = require('express');
const passport = require("passport");
const { connectToAcc } = require("../db/mongo");
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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
