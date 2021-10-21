// Logic (Controllers) for routes related to Posts
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req,res) => {
    try {
        const postMessages = await PostMessage.find()

        res.status(200).json(postMessages)

    } catch (error) {
        res.status(404).json({message : error.message})
    }
};

export const createPost = async (req,res) => {

  const { title, message, selectedFile, creator, tags } = req.body;

  const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

  try {
     await newPostMessage.save();

     res.status(201).json(newPostMessage );
   } catch (error) {
     res.status(409).json({ message: error.message });
  }
}

export const updatePost = async (req, res) => {

  // We receive the id from the params of the route. While destructuring we rename the :id to _id

  const {id : _id} = req.params;

  // Checking if the Id received is actually a mongoose ID

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No such Post Exist")
  const post = req.body;  //The data of the Post to be Updated
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new : true})    //This updates the post in our DB and returns the new Updated Post

  res.json(updatedPost);    //We send this updatedPost as the response in JSON Format
}

export const deletePost = async (req,res) => {
  const {id : _id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No such Post Exist");

  await PostMessage.findByIdAndRemove(_id);

  res.json({message : "Post deleted Successfully"})

}

export const likePost = async (req,res) => {
  const {id: _id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No such Post Exist");

  const post = await PostMessage.findById(_id);
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, {likeCount : post.likeCount + 1 }, {new : true});

  res.json(updatedPost)
}
