var express = require('express');
var router = express.Router();
const {createUser, getMyProfile} = require("../controllers/userController");
const User = require('../models/user');
const { loginRequired } = require('../middleware/auth');

/* GET users listing. */
router.route("/").get(async function(req, res, next) {
  const user = await User.find({})
  // const user = await User.find({}, {name: 1, email: 1, password: 1})
  res.status(201).json({
    status: "success",
    data: user
  })
})

router.route("/").post(createUser)

router.route("/me").get(loginRequired, getMyProfile)




module.exports = router;
