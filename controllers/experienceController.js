const Exp = require ("../models/experience")
const Tag = require("../models/tag")

exports.getExperiences = async (req, res, next) => {
    try{
        const exps = await Exp.find().populate("host").populate("tags")
        res.status(201).json({status: "success", data: exps})
    }catch(err){
        res.status(400).json({status: "fail", message: err.message})
    }
}

exports.createExperience = async(req, res, next) => {
    try{
        const { title, description, tags } = req.body

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
            description: description, 
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
            message: "Failllllllll"
        })
    }
}