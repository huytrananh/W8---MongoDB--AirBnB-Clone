const router = require("express").Router({mergeParams: true}) // ??
const {getExperiences, createExperience, getReviews, createReview, getSingleExp, updateExperience, deleteExperience} = require("../controllers/experienceController")
const { loginRequired, hostRequired } = require("../middleware/auth")


router.route('/')
.get(loginRequired, getExperiences)
.post(loginRequired, hostRequired, createExperience)

router.route('/:expId')
.put(loginRequired, hostRequired, updateExperience)
.delete(loginRequired, hostRequired, deleteExperience)



router.route('/reviews')
.get(getReviews)
.post(loginRequired, createReview)

router.route('/:id')
.get(getSingleExp)

module.exports = router

