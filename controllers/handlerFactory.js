const Tag = require("../models/tag")

// Model => which document you want to delete
exports.deleteOne = Model => async(req, res, next) => { // funtion return a funtion
    try{
        let filterObj = {}
        if(Model.modelName === "Exp"){ // ??
            filterObj._id = req.params.expId
            filterObj.host = req.user._id
        }else if(Model.modelName === "Review"){
            filterObj._id = req.params.reviewId
            filterObj.host = req.user._id
        }
        const doc = await Model.findOneAndDelete(filterObj)

        if(!doc){
            return res.status(404).json({status: "fail", message: "No document found"})
        }
        
        res.status(204).end()
    }catch(err){
        return res.status(500).json({status: "error", message: err.message})
    }
}

exports.updateOne = Model => async(req, res, next) => {
    try{
        let filterObj = {}
        let allows = []
        if(Model.modelName === "Exp"){ // ??
            filterObj._id = req.params.expId
            filterObj.host = req.user._id
            allows = ['title', 'description', 'tags']
            if(req.body.tags){
                req.body.tags = await Tag.convertToObject(req.body.tags)
            }
        }else if(Model.modelName === "Review"){
            filterObj._id = req.params.reviewId
            filterObj.host = req.user._id
            allows = ['rating', 'review']
        }
        const doc = await Model.findOne(filterObj)
        if(!doc){
            return res.status(404).json({status: "fail", message: "No document found"})
        }

        // Modified data
        // Change the value of properties in doc according the allows array
        for(const key in req.body){
            if(allows.includes(key)){
                doc[key] = req.body[key]
            }
        }

        await doc.save()

        res.status(200).json({status: "success", data: doc}) 
    }catch(err){
        return res.status(500).json({status: "error", message: err.message})
    }
}








// const Tag = require("../models/tag")

// exports.deleteOne = Model => async(req, res, nect) => {
//     try{
//         let filterObj = {}
//         if(Model.modelName === "Exp"){
//             filterObj._id = req.params.expId
//             filterObj.host = req.user._id
//         }else if(Model.modelName === "Review"){
//             filterObj._id = req.params.reviewId
//             filterObj.host = req.user._id
//         // }else if(Model.modelName === "User"){
//         //     filterObj._id = req.params.userId
//         //     filterObj.host = req.user._id
//         }
//         const doc = await Model.findOneAndDelete(filterObj)
//         if(!doc){
//             return res.status(404).json({status: "fail", message: "No document found"})
//         }

//         res.status(204).end()// ????
//     }catch(err){
//         // err.statusCode = 500
//         // err.status = "errorrrrrr"
//         // next(err)
//         res.status(500).json({status: "fail", message: err.message})
//     }
// }

// exports.updateOne = Model => async(req, res, next) => {
//     try{
//         let filterObj = {}
//         let allows = []
//         if(Model.modelName === "Exp"){
//             filterObj._id = req.params.expId
//             filterObj.host = req.user._id
//             allows = ["title", "description", "tags"]
//             if(req.body.tag){
//                 req.body.tags = await Tag.convertToObject(req.body.tags)

//             }
//         }else if(Model.modelName === "Review"){
//             filterObj._id = req.params.reviewId
//             filterObj.host = req.user._id
//             allows = ["title", "description", "tags"]
//         }

//         const doc = await Model.findOne(filterObj)
//         if(!doc){
//             return res.status(404).json({status: "fail", message: "No document found"})
//         }
//         // Modifiy data
//         // const allows = ['title, description, tags']
//         // // 2 ways: 
//         // // // 1. Create another obj with these allower keys,
//         // change the value of props in doc according the allows arr
//         // for(const key in req.body){
//         //     if(allows.includes(key)){
//         //         doc[key] = req.body[key]
//         //     }
//         // }
//         await doc.save()
//         // // // 2. Delete unallowed keys from req.body
//         // for(const key in req.body){
//         //     if(!allows.includes(key)){
//         //         delete req.body[key]
//         //     }
//         // }

//         res.status(200).json({
//             status: "success",
//             data: doc
//         })
//     }catch(err){
//         res.status(500).json({status: "fail", message: err.message})
//     }
// }