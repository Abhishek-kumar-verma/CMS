const express = require('express');
const { validToken } = require('../middleware/authenticateToken');
const { ValidationError } = require('../Error/error');
const Posts = require('../models/Posts');
const Category = require('../models/Categories.js');
const Tag = require('../models/Tags.js')

const postRouter = express.Router();

postRouter.post("/addPost", validToken , async(req,res)=>{
    const { title , content , excerpt , slug , comment_status , comments , status , author , featured_media , categories , tags } = req.body;
    if( !title || !content || !slug || !status || !author || categories.length === 0 || tags.length === 0 ){
        return res.json({
            status : false,
            data: null,
            message : "!required title , content , slug , status , author , categories, tags,"
        })

    }
    try{
        const newPost = new Posts({
            title,
            content,
            excerpt,
            slug,
            comment_status,
            comments,
            status,
            author,
            featured_media,
            categories,
            tags
        });
        const savePost = await newPost.save();
        for (const categoryId of savePost.categories) {
            await Category.findByIdAndUpdate(categoryId, { $inc: { post_count: 1 } });
          }
        for (const tagId of savePost.tags) {
            await Tag.findByIdAndUpdate(tagId, { $inc: { post_count: 1 } });
        }
        
        if( savePost){
            return res.json({
                status : true ,
                data : savePost,
                messgage:'New Post Added'
            })
        }

    }catch(error){
        return res.json({
            status : false,
            data: null,
            message : error.message
        })

    }
})

postRouter.get("/getPostsByStatus/:status" , validToken , async(req, res) =>{
    const status= req.params.status || 'publish';
    try{
        const postsWithStatus = await Posts.find({ status });
        if( postsWithStatus){
            return res.json({
                status:true,
                data: postsWithStatus,
                message:'Post fetch by status',
            })
        }

    }catch(error){
        return res.json({
            status : false,
            data : null,
            message : 'Something went wrong'
        })
    }
})

postRouter.delete("/deletePost/:id" , validToken , async(req,res) =>{
    const { id} = req.params;
    if( !id) {
        return res.json({
            status : false,
            data: null,
            message : "Id not found"
        })

    }
    try{
        const post = await Posts.findByIdAndDelete(id);
        for (const categoryId of post.categories) {
            await Category.findByIdAndUpdate(categoryId, { $inc: { post_count: -1 } });
          }
        for (const tagId of post.tags) {
            await Tag.findByIdAndUpdate(tagId, { $inc: { post_count: -1 } });
        }
        return res.json({
            status : true,
            data:null,
            message: "Post deleted"
        })

    }catch(error){
        return res.json({
            status: true,
            data : null,
            message : error
        })
    }
})

// update issue

// postRouter.put("/updatePost/:id", validToken , async(req,res)=>{
//     const { id } = req.params;
//     const { title , content , excerpt , slug , comment_status , comments , status , author , featured_media , categories , tags } = req.body;
//     if( !title || !content || !slug || !status || !author || categories.length === 0 || tags.length === 0 ) throw new ValidationError('!required titile, content, slug, status, author , categories , tags');
//     try{
//         const existPost = await Posts.findById(id);
//         if( !existPost) throw new ValidationError("not found ");
//         const newPost = {};
//         newPost.title = title ? title : existPost?.title;
//         newPost.content = content ? content : existPost?.content;
//         newPost.status = status ? status : existPost?.status;
//         newPost.slug = slug ? slug : existPost?.slug;
//         newPost.author = author ? author : existPost?.author;
//         newPost.featured_media = featured_media ? featured_media : existPost?.featured_media;
//         newPost.categories = categories.length > 0  ? categories : existPost?.categories;
//         newPost.tags = tags.length > 0 ? tags : existPost?.tags;
//         newPost.comment_status = comment_status ? comment_status : existPost?.comment_status;
//         // newPost.comments = comments.length > 0 ? comments : existPost?.comments;

//         // const newPost = new Posts({
//         //     title,
//         //     content,
//         //     excerpt,
//         //     slug,
//         //     comment_status,
//         //     comments,
//         //     status,
//         //     author,
//         //     featured_media,
//         //     categories,
//         //     tags
//         // });
//         const updatePost = await Posts.findByIdAndUpdate(id , newPost);
//         for (const categoryId of savePost.categories) {
//             await Category.findByIdAndUpdate(categoryId, { $inc: { post_count: 1 } });
//           }
//         for (const tagId of savePost.tags) {
//             await Tag.findByIdAndUpdate(tagId, { $inc: { post_count: 1 } });
//         }
        
//         if( savePost){
//             return res.json({
//                 status : true ,
//                 data : savePost,
//                 messgage:'New Post Added'
//             })
//         }

//     }catch(error){
//         return res.json({
//             status : false,
//             data: null,
//             message : "Something went wrond"
//         })

//     }
// })

module.exports = postRouter;