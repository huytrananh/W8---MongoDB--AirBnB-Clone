const mongoose = require("mongoose")
// const Tag = require("./tag")

const schema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 100,
        required: [true, "Must have a title"]
    },
    duration: {
        type: String,
        required: true
    },
    groupSize: {
        type: String,
        required: true
    },
    // images: {

    // },
    description: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 1000
    },
    items: [{
        type: String,
        required: true
    }],
    price: {
        type: String,
        required: true
    },
    country: [{
        type: String,
        required: true
    }],
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: "Tag",
        required: true
    }],
    host: {
        type: mongoose.Schema.ObjectId, // ??
        ref: "User", // ??
        required: [true, "Experience must have a host"]
    }
},{
    timestamps: true,
    toJSON: {virtuals: true },
    toObject: { virtuals: true }
})


// schema.statics.convertToObject = async function(arr){
//     let arr = [...this.tags] //arr of strings
//     //Change arr to arr of objectId
//     // // Find the tag from each string from tag model
//     let foo = arr.map(async e => await Tag.findOne({
//         tag: e.toLowerCase().trim()
//     }))
//     let result = Promise.all(foo) 
// }



// schema.pre("save", async function(next){
//     let arr = [...this.tags] //arr of strings
//     //Change arr to arr of objectId
//     // // Find the tag from each string from tag model
//     let foo = arr.map(async e => await Tag.findOne({
//         tag: e.toLowerCase().trim()
//     }))
//     let result = Promise.all(foo)
//     console.log(result)
//     this.tags = result

//     next()
// })


schema.pre(/^find/, function (next){
    this
    .populate("host", "-createdAt -updatedAt -type -email")
    .populate("tags")
    next();
})

module.exports = mongoose.model("Exp", schema)