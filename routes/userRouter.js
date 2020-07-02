var express = require('express');
var router = express.Router();
const {createUser, getMyProfile, getUsersList} = require("../controllers/userController");
const { loginRequired } = require('../middleware/auth');
const User = require('../models/user');

/* GET users listing. */
router.route("/")
.get(getUsersList)
.post(createUser)


router.route("/me")
.get(loginRequired, getMyProfile)

module.exports = router;
