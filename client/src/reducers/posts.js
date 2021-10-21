// This reducer takes in a state and action. Since state is same as our Posts,
// We renamed it to posts and assigned an initial value of empty array
import { actionTypes } from "../actionTypes/actionTypes.js";

export default ( posts = [], action) => {

    switch (action.type) {

        case actionTypes.FETCH_ALL :
            return action.payload;
        case actionTypes.CREATE_POST :
            return [...posts, action.payload];
        case actionTypes.UPDATE_POST :
            return posts.map(post => (post._id === action.payload._id) ? action.payload : post)
            // We are mapping each post and comparing the id with id of the newly updated post which is given by action.payload
            // the post whose id matches with the updatedPost, we return this updatedPost instead of the original post
        case actionTypes.DELETE_POST:
            return posts.filter(post => post._id !== action.payload);

        case actionTypes.LIKE_POST :
            return posts.map(post => (post._id === action.payload._id) ? action.payload : post)
        default:
            return posts;
    }
}
