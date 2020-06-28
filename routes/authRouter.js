// var express = require('express');
// var router = express.Router();
// const {loginWithEmail} = require("../controllers/authController");
// const Auth = require('../middleware/auth')

// router.route("/").get(function(req, res, next) {
//     res.send('respond with a resource');
//   })
  
// router.route("/").post(function(req, res, next) {
//     const auth = Auth.create({
//       name: req.body.name,
//     })
//     res.status(201).json({
//       status: "success",
//       data: auth
//     })
//   })

// module.exports = router;

var express = require('express');
const { loginWithEmail } = require('../controllers/authController');
var router = express.Router();

router.route("/login").post(loginWithEmail)
module.exports = router;