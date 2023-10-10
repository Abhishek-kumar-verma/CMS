const express = require('express');
const Tag = require("../models/Tags.js");
const { ValidationError } = require('../Error/error.js');
const { validToken } = require('../middleware/authenticateToken.js');

const tagRouter = express.Router();

tagRouter.post("/addTag" ,validToken, async(req, res)=>{
    const { name , description , post_count } = req.body;
    try{
        if( !name ){
            return res.json({
                status : false,
                data: null,
                message : "!Required name"
            })
    
        };
        const isExist = await Tag.findOne({name});
        if( isExist) {
            return res.json({
                status : false,
                data: null,
                message : "Tag already exist"
            })
    
        };
        const tagData = {
            name : name,
        }
        if( description){
            tagData.description = description 
        }
        const newTag = new Tag(tagData);
        const saveTag = await newTag.save();
        if( saveTag){
            return res.json({
                status : true,
                data : saveTag,
                message : " New Tag added"
            })
        }

    }catch(error){
        return res.json({
            status : false,
            data : null,
            message : `Something went wrong`
        })

    }
});

tagRouter.get("/getAllTag", validToken , async(req, res)=>{
    try{
        const allTag = await Tag.find({});
        return res.json({
            status : true,
            data : allTag,
            message : " All Tags Found",
        })

    }catch(error){
        return res.json({
            status : false,
            data : null,
            message : " tags not found"
        })
    }
})

tagRouter.get("/getTag/:id" , validToken , async(req , res)=>{
    const { id } = req.params;
    
    try{
        if( !id) {
            return res.json({
                status : false,
                data: null,
                message : "id not found"
            })
    
        };
        const tag = await Tag.findById(id);
         if( tag){
            return res.json({
                status: true,
                data : tag,
                message : `Tag found`
            })
         }

    }catch(error){
        return res.json({
            status : false,
            data : null,
            message : error.message
        })
    }
})

tagRouter.delete("/deleteTag/:id" , validToken , async(req , res)=>{
    const { id } = req.params;
    try{
        if( !id) {
            return res.json({
                status : false,
                data: null,
                message : "Id not found"
            })
    
        };
        const tag = await Tag.findByIdAndDelete(id);
         if( tag){
            return res.json({
                status: true,
                data : tag,
                message : `Tag deleted`
            })
         }

    }catch(error){
        return res.json({
            status : false,
            data : null,
            message : error.message
        })
    }
})

tagRouter.put("/updateTag/:id" ,validToken, async(req, res)=>{
    const { id} = req.params;
    const { name , description , post_count } = req.body;
    try{
        if( !name || !id){
            return res.json({
                status : false,
                data: null,
                message : "!required name , Id"
            })
    
        };

        const isExist = await Tag.findById(id);
        if( !isExist) {
            return res.json({
                status : false,
                data: null,
                message : "Tag not exist"
            })
    
        }
        const tagData = {
            name : name,
        }
        tagData.description = description ? description : isExist?.description;
        tagData.post_count = post_count ? post_count : isExist?.post_count;
        const newTag = await Tag.findByIdAndUpdate( id , tagData , { new: true });
        if( newTag){
            return res.json({
                status : true,
                data : newTag,
                message : " Tag updated"
            })
        }

    }catch(error){
        return res.json({
            status : false,
            data : null,
            message :error.message
        })

    }
});

module.exports = tagRouter;