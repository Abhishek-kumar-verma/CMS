const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        default : "",
    },
    description : {
        type : String,
        default : "",
    },
    parent : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        
    },
    slug:{
        type : String,
        default :""
    },
    post_count: {
        type : Number,
        default :0,
    }

} , { timestamps : true});

const Category = new mongoose.model("Category", categorySchema);

module.exports = Category;