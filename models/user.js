const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const round = 10 // ??
const jwt = require("jsonwebtoken")
const { schema } = require("./experience")


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    name: {
        type: String,
        require: [true, "Name is required"],
        trim: true,
    },
    password: {
        type: String,
        // require: [true, "Password is required"],
    },
    tokens: [String],
    type: {
        type: String,
        enum: ["normal", "host"],
        required: [true, "Type is required"],
        default: "normal"
    }
},{
    // hide the password after create db = don't show the password
    timestamps: true, // ?? Why need this
    toJSON: {virtuals: true}, 
    toObject: {virtuals: true}
})

// delete password ?? Why need this
userSchema.methods.toJSON = function(){
    // inside method, this will refer to the instance
    const obj = this.toObject() // just delete in frontend, not delete in database
    delete obj.password
    delete obj.id
    delete obj.tokens

    return obj
}

// generate Token
userSchema.methods.generateToken = async function(){
    // this will refer to the instance of user
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
    },process.env.SECRET, { expiresIn: "7 days"})
    this.tokens.push(token) // this mean user ?? why dont use user
    this.save()  // user.save()
    return token
}

userSchema.statics.loginWithEmail = async function(email, password){
    // inside static, this will refer to the class
    // find user from db
    const user = await User.findOne({email: email})
    if(!user){ 
        return null 
    }

    // compare raw password with hashed password
    const match = await bcrypt.compare(password, user.password) //match is boolean
    console.log(match)
    // if true => return user
    if(match){
        return user
    }
    return null// else => return null
    
}

// Hash the password
userSchema.pre("save", async function(next){ // pre: middle ware
    // this = the instance of User model
    if(this.isModified("password")){   // ??
        this.password = await bcrypt.hash(this.password, round) // ?? round
    }
    next()
})

schema.statics.findOneOrCreate = async function({email, name}){
    // `this` refers to User model
    let user = await this.findOne({email})
    if(!user){
        user = await this.create({
            email: email,
            name: name
        })
    }
}
const User = mongoose.model("User", userSchema)

module.exports = User