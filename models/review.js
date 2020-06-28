const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    rate: {
        type: Number,
        required: true,
    },
    review: {
        type: String, 
        required: true
    }
},{
    timestamps: true,
    toJSON: {virtuals: true },
    toObject: { virtuals: true }
})

module.exports = mongoose.model("Review", schema)