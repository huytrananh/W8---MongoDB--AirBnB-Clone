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
// const { loginRequired } = require('../middleware/auth')
var router = express.Router();

router.route("/login").post(loginWithEmail)

// async function logout(req, res, next){
//     try{
//         const token = req.headers.authorization.replace("Bearer ", "")
//         req.user.tokens = req.user.tokens.filter(element => element !== token)
//         await req.user.save()

//         res.status(204).end()
//     }catch(err){
//         res.status(400).json({
//             status: "fail",
//             error: "unauthorized"
//         })
//     }
// }

// router.route("/logout").get(loginRequired, logout)

module.exports = router;