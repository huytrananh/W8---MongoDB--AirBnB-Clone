const User = require("../models/user")

exports.loginWithEmail = async(req, res, next) => {
    try{
       const {email, password} = req.body
       if(!email || !password){
           return res.status(400).json({
                status: "fail",
                error: "Email, Name, Password are require"
            })
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
           data: {user: user, token: `Bearer ${token}`}
       })
    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}



