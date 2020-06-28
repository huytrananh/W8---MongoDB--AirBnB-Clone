const User = require("../models/user")

exports.createUser = async (req, res, next) => {
    try{
        const {email, name, password, type} = req.body
        if(!email || !name || !password){
            return res.status(400).json({status: "fail",error: "Email, Name, Password, are require"})
        }
        const user = await User.create({
            email: email, 
            name: name, 
            password: password, 
            type: type || "normal"
        })
        res.status(201).json({status: "success",data: user})
    }catch(err){
        res.status(500).json({status: "Fail",message: err.message})
    }
}

exports.getMyProfile = (req, res, next) => {
    res.json({status: "success",data: req.user})
}