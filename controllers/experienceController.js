const Exp = require ("../models/experience")
const Tag = require("../models/tag")
const Review = require("../models/review")
const User = require("../models/user")
// const {deleteOne, updateOne} = require("./handlerFactor")


exports.getExperiences = async (req, res, next) => {
    try{
        const exps = await Exp.find({host: req.user._id}).populate("host").populate("tags")
        res.status(201).json({status: "success", data: exps})
    }catch(err){
        res.status(400).json({status: "fail", message: err.message})
    }
}

exports.createExperience = async(req, res, next) => {
    try{
        const { title, description, tags, duration, groupSize, items, price, country } = req.body

        if(!title || !description || !tags){
            return res.status(400).json({status: "fail",error: "Title, description, tags are required"})
        }
        // Tags is an array of string,
        // we need to convert string to array of Obj
        // if a tag exists in tags collection, then we will use the asscociate id as objectId
        // else, we need to create that tag document in the collection first, then run the id
        // => define it inside experience models or tag models

        const newArr = await Tag.convertToObject(tags)

        const exp = await Exp.create({
            title: title, 
            duration: duration,
            groupSize: groupSize,
            description: description, 
            items: items,
            price: price,
            country: country,
            tags: newArr, 
            host: req.user._id
        })

        res.status(201).json({
            status: "success",
            data: exp
        })
    }catch(err){
        res.status(400).json({
            status: "fail",
            message: "Cannot create Experience"
        })
    }
}

exports.getReviews = async (req, res, next) => {
    try{
        const reviewList = await Review.find({})
        res.status(201).json({
            status: "success",
            data: reviewList
        })
    }catch(err){
        res.status(401).json({
            status: "fail",
            message: "Cannot get Reviews"
        })
    }
}

exports.createReview = async (req, res, next) => {
    try{
        const {rate, review} = req.body
        const userId = req.user._id

        if(!rate || !review){
            return res.status(400).json({status: "fail",error: "Rate, review is required"})
        }
        const result = await Review.create({
            rate: rate,
            review: review,
            userId: userId
        })

        res.status(201).json({
            status: "success",
            data: result
        })
    }catch(err){
        res.status(401).json({
            status: "fail",
            message: "Cannot create Review"
        })
    }
}

exports.getSingleExp = async (req, res, next) => {
    // try{
    //     const id = req.params.id
    //     if(!id){ return res.status(404) }

    //     const exps = Exp.findById(id)
    //     .populate("host", "-createdAt -updatedAt -type -email")
    //     .populate("tags")

    //     if(!exps) res.status(404)
        
    //     res.json({ status: "ok", data: exps })
    // }catch(err){
    //     res.json({ status: "fail", error: err })
    // }
    try {
        const exps = await Exp.findById(req.params.expId)
        res.json({ status: "success", data: exps })
    } catch (err) {
        res.json({ status: "fail", error: err })
    }
}

exports.updateExperience = async (req, res, next) => {
    try{
        const exp = await Exp.findById(req.params.expId)
        if(!exp){
            throw new Error("There is no experience")
        }

        const fields = Object.keys(req.body)
        fields.map(field => exp[field] = req.body[field])

        exp.save()

        res.json({
            status: "success",
            data: exp
        })
    }catch(err){
        res.json({status: "fail", message: "Cannot update Experience"})
    }
}

exports.deleteExperience = async (req, res, next) => {
    try{
        await Exp.findOneAndDelete({_id:req.params.expId, host: req.user._id})
        res.status(204).json({
            status: "success",
            data: null
          })
    }catch(err){
        res.json({status: "fail", message: "Cannot delete Experience"})
    }
}


// WAY 2:
// exports.deleteExperience = deleteOne(Exp)
// exports.updateExperience = updateOne(Exp)