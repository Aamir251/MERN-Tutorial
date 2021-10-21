import React from "react"
import Post from "./Post/Post"
import useStyles from "./styles"
import { Grid, CircularProgress } from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'

const Posts = ({setCurrentId})=>{
    const posts = useSelector((state) => state.posts)  //We know its called posts as we named it in the index file of Reducers

    const classes = useStyles();
    console.log(posts);
    return <>
        {!posts.length ? <CircularProgress/> :
          <Grid container className={classes.container} alignItems="stretch" spacing={3} >

            { posts.map(post => {

              return (
                <Grid key={post._id} item  xs={12} sm={6} >
                  <Post post={post} setCurrentId={setCurrentId} />
                </Grid>

              )
            })}
          </Grid>
        }
    </>

}
export default Posts;
