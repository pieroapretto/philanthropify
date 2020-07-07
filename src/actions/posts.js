import uuid from 'uuidv4';
import { firebase_service }  from '../services/firebase_service';

// 'ADD_POSTS'
export const addPosts = (posts) => ({
  posts: posts.map(post => {
    return {
        key: uuid(),
        id: post._id,
        title: post.title,
        type: post.type,
        like_count: post.like_count,
        timestamp: setTimeValue(post.timestamp),
        text: post.text,
        image: post.image,
        comment_count: post.comment_count,
        comments: post.comments,
        poll: post.poll,
        tips_total: post.tips_total,
        is_favorite: post.is_favorite,
        rating: post.rating
    }
  })
});

// ADD_POST
export const addPost = (
    {
        id,
        title = '',
        type = '',
        like_count = 0,
        timestamp,
        text = '',
        image = null,
        comment_count = 0,
        comments,
        poll,
        tips_total = 0,
        is_favorite = false,
        rating = 0
    } = {}) => ({
    type: 'ADD_POST',
    post: {
        id,
        title,
        type,
        like_count,
        timestamp = setTimeValue(post.timestamp),
        text,
        image,
        comment_count,
        comments,
        poll,
        tips_total,
        is_favorite,
        rating
    }
});

// REMOVE_POST
export const removePost = ({ id } = {}) => ({
    type: 'REMOVE_POST',
    id
});

// EDIT_POST
export const editPost = (id, updates) => ({
    type: 'EDIT_POST',
    id,
    updates
});

const setTimeValue = (timestamp) => {
  let date = new Date(timestamp);
  return date.getTime();
}

export const getPosts = () => {
  return (dispatch) => {
    firebase_service.getPosts().then(posts => {
      dispatch(addPosts('ADD_POSTS', posts));
    });
  }
}