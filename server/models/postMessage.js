import mongoose from "mongoose";

const postSchema = mongoose.Schema({

    title : String,
    message : String,
    creator : String,
    tags :[String],
    selectedFile : String, // we'll convert an image to string using react_base_64
    likeCount : {
        type : Number,
        default : 0
    },
    createdAt : {
        type : Date,
        default : new Date()
    }
})

const postMessage = mongoose.model('postMessage', postSchema);
export default postMessage;
