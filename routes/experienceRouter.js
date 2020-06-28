const router = require("express").Router({mergeParams: true}) // ??
const {getExperiences, createExperience} = require("../controllers/experienceController")
const { loginRequired, hostRequired } = require("../middleware/auth")


router.route('/')
.get(getExperiences)
.post(loginRequired, hostRequired, createExperience)



module.exports = router

