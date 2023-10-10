const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    title :{
        type : String,
        default : ""
    },
    content : {
        type : String,
        default : "",
    },
    slug : {
        type : String , 
        default : ""
    },
    excerpt :{
        type : String,
        default :'',
    } ,
    status :{
        type: String,
        enum: ["private", "publish", "trash", "draft", "schedule"],
        default: "draft", 
    },
    featured_media: {
        type : [String],
        default :[]
    },
    author :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Author"
    },
    categories: [{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Category" 
    }],
    tags : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Tag"
    }],
    comment_status : {
        type : Boolean,
        default :true
    },
    comments : [{
        type : [String],
        default:[]
    }]

    

},{timestamps: true})

const Posts = new mongoose.model("Posts" , postsSchema);
module.exports = Posts;