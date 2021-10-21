import * as api from '../api'
import {actionTypes} from "../actionTypes/actionTypes.js"
// action creators
export const getPosts = () => async(dispatch) => {

  try {
    const {data} = await api.fetchPosts()

    dispatch({
      type : actionTypes.FETCH_ALL,
      payload : data
    })

  } catch (e) {
    console.log(e.message);

  }
}

export const createPost = (post) => async(dispatch) => {

  try {

    const { data } = await api.createPost(post) //making a post api request to our server

    dispatch({
      type : actionTypes.CREATE_POST,
      payload : data
    })
  } catch (e) {
    console.log(e);
  }
}

export const updatePost = (id, post) => async(dispatch) => {

  try {
    const {data} = await api.updatePost(id, post)  //This returns the updatedPost as the response;
    dispatch({
      type : actionTypes.UPDATE_POST,
      payload: data
    })

  } catch (e) {
    console.log(e.message);
  }

}

// Delete Post action creator

export const deletePost = (id) => async(dispatch) => {
  try {
    await api.deletePost(id)
    dispatch({
      type : actionTypes.DELETE_POST,
      payload : id
    })
  } catch (e) {
    console.log(e);
  }

}

// increase likeCount action creator

export const likePost = (id) => async(dispatch) => {
  try {
    const {data} = await api.likePost(id);
    dispatch({
      type : actionTypes.LIKE_POST,
      payload : data
    })
  } catch (e) {
    console.log(e);
  }
}
