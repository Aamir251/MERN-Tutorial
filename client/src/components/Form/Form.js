import React, { useState, useEffect } from "react";
import useStyles from "./styles"
import { Paper, Button, Typography, TextField } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts"

const Form = ({ currentId, setCurrentId }) => {

    const [postData, setPostData] = useState({creator : '', title : '', message : '', tags : '', selectedFile : ''})
    const dispatch = useDispatch();
    const classes = useStyles();

    const post = useSelector((state) => {
      if (currentId) {    //means there is a post selected for updating
        return state.posts.find((p) => p._id === currentId) //Return only that post whose id same as the currentID
      } else {
        return null;
      }

    })

    useEffect(() => {
      if (post) {
        setPostData(post)   //Populate the Form with the post data that was clicked
      }
    }, post)

    const handleSubmit = (e) => {
      e.preventDefault()
      if (currentId) {
        dispatch(updatePost(currentId, postData))
      } else {
        dispatch(createPost(postData))
      }
      clear()
    }

    const clear = () => {
      setCurrentId(null);
      setPostData({creator : '', title : '', message : '', tags : '', selectedFile : ''})
    }

    return (

        <Paper className={classes.paper}>
          <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
            <TextField name="creator" variant="outlined" label="Creator" fullWidth value = {postData.creator} onChange = {(e) => setPostData({...postData, creator : e.target.value})} />
            <TextField name="title" variant="outlined" label="Title" fullWidth value = {postData.title} onChange = {(e) => setPostData({...postData, title : e.target.value})} />
            <TextField name="tags" variant="outlined" label="Tags" fullWidth value = {postData.tags} onChange = {(e) => setPostData({...postData, tags : e.target.value.split(',')})} />
            <TextField name="message" variant="outlined" label="Message" fullWidth value = {postData.message} onChange = {(e) => setPostData({...postData, message : e.target.value})} />
            <div className={classes.fileInput}>
              <FileBase type="file" multiple={false} onDone= {({base64}) =>setPostData({...postData, selectedFile : base64}) }/>
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" type="submit" size="large" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

          </form>

        </Paper>

    )
}

export default Form;
