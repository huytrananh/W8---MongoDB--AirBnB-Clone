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