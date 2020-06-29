const router = require("express").Router({mergeParams: true}) // ??
const {getExperiences, createExperience, getReviews, createReview, getSingleExp, updateExperience, deleteExperience} = require("../controllers/experienceController")
const { loginRequired, hostRequired } = require("../middleware/auth")


router.route('/')
.get(loginRequired, getExperiences)
.post(loginRequired, hostRequired, createExperience)

router.route('/:expId')
.patch(loginRequired, hostRequired, updateExperience)
.delete(loginRequired, hostRequired, deleteExperience)
.get(getSingleExp)


router.route('/reviews')
.get(getReviews)
.post(loginRequired, createReview)

module.exports = router

