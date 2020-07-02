const Exp = require ("../models/experience")
const Tag = require("../models/tag")
const Review = require("../models/review")
const User = require("../models/user")
const {deleteOne, updateOne} = require("./handlerFactory")


exports.getExperiences = async (req, res, next) => {
    try{
        // const exps = await Exp.find({host: req.user._id}).populate("host").populate("tags")
        const exps = await Exp.find().populate("host").populate("tags")
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
            message: err.message
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
        res.json({ status: "fail", message: err.message })
    }
}

// exports.updateExperience = async (req, res, next) => {
//     try{
//         let exp = await Exp.findOne({_id:req.params.expId, host: req.user._id})
        
//         if(!exp){
//             throw new Error("There is no experience")
//         }

//         const fields = Object.keys(req.body)
//         fields.forEach(async element => {
//             if(element === "tags"){
//                 const newArr = await Tag.convertToObject(req.body["tags"])
//                 exp[element] = newArr
//             }else{
//                 exp[element] = req.body[element]
//             }
//         })

//         // fields.map(field => exp[field] = req.body[field])

//         await exp.save()

//         res.json({
//             status: "success",
//             data: exp
//         })
//     }catch(err){
//         res.json({status: "fail", message: "Cannot update Experience"})
//     }
// }

// exports.deleteExperience = async (req, res, next) => { // wronggggggggggggggggggg
//     try{
//         let exp = await Exp.findByIdAndDelete({_id:req.params.expId, host: req.user._id})
//         res.status(200).json({
//             status: "success",
//             data: exp
//           })
//     }catch(err){
//         res.json({status: "fail", message: "Cannot delete Experience"})
//     }
// }

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

// WAY 2:
exports.deleteExperience = deleteOne(Exp) // pass the name of model you want to delete
exports.updateExperience = updateOne(Exp)