const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
    name : {
        type : String,
        default : "",
    },
    description : {
        type : String,
        default : "",
    },
    post_count : {
        type : Number,
        default : 0
    }
}, {timestamps : true});

const Tag = new mongoose.model("Tag", tagSchema);

module.exports = Tag;