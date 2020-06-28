const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    tag: {
        type: String,
        required: [true, "Tag is required"],
        unique: true,
        lowercase: true,
        trim: true
    }
})

// convert string to object
schema.statics.convertToObject = async function(arr){
    //Change arr to arr of objectId
    //Find the tag from each string from tag model
    let foo = arr.map(async e => { 
        let bar = await this.findOne({tag: e.toLowerCase().trim() })
        
        if(bar)
            return bar

        bar = await this.create({ tag: e.toLowerCase().trim() })
        return bar 
    })
    let result = await Promise.all(foo)
    console.log(result)

    return result
}

module.exports = mongoose.model("Tag", schema)