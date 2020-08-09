import { uuid } from 'uuidv4';
import { firebase_service } from '../services/firebase_service';
import { metadata_service } from '../services/metadata_service';

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
        type = '',
        like_count = 0,
        text = '',
        timestamp = null,
        comment_count = 0,
        comments = [],
        tips_total = 0,
        is_favorite = false,
        rating = 0,
        imageUrl = '',
        link = {},
        authorId = null
    } = {}) => ({
    type: 'ADD_POST',
    post: {
        id: uuid(),
        authorId,
        type,
        like_count,
        timestamp: setTimeValue(timestamp),
        text,
        comment_count,
        comments,
        tips_total,
        is_favorite,
        rating,
        imageUrl,
        link
    }
});

export const saveImage = (file) => {
  return () => {
    return firebase_service.saveImage(file).then(data => {
      return data;
    });
  }
};

export const getLinkMetaData = (link) => {
  return () => {
    return metadata_service.getLinkMetaData(link).then(data => {
      return data;
    });
  }
};

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
  let date = timestamp ? new Date(timestamp) : new Date();
  return date.getTime();
}

export const getPosts = () => {
  return (dispatch) => {
    firebase_service.getPosts().then(posts => {
      dispatch(addPosts('ADD_POSTS', posts));
    });
  }
}