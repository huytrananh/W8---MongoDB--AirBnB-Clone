const User = require("../models/user")
const passport = require("../oauth/index")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")


exports.loginWithEmail = catchAsync (async(req, res, next) => {
       const {email, password} = req.body
       if(!email || !password){
           console.log("aaa")
           next( new AppError(404, "Missing email or password!"))
       }
       
       const user = await User.loginWithEmail(email, password)
       if(!user){
           return res.status(401).json({
            status: "fail",
            message: "Wrong Email or Password"
        })
       }
       
       const token = await user.generateToken()

       res.json({
           status: "success",
           data: {user: user, token: token}
       })
})

exports.loginFacebook = passport.authenticate("facebook", { scope: ['email'] })

exports.facebookAuthHandler = function(req, res, next){
    passport.authenticate("facebook", async function(err, profile){
        // if email exist in database => login the user and return token
        // else we create a new user with such email and then return the token as well
        try{
            const email = profile._json.email
            const name = profile._json.first + " " + profile._json.last_name
            const user = await User.findOneOrCreate(email, name)
            const token = await user.generateToken()
            return res.redirect(`https://localhost:3000/?token=${token}`)
        }catch(err){
            // if error => redirect to login page
            return res.redirect('https://localhost:3000/login')
        }
        // return res.json({profile})
    })(req, res, next)
}
    




