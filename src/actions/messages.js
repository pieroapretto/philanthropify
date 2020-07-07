import uuid from 'uuidv4';
import { firebase_service }  from '../services/firebase_service';

// 'ADD_POSTS'
export const addMessages = (messages) => ({
  messages: messages.map(message => {
    return {
        key: uuid(),
        _id: message._id,
        title: message.title,
        type: message.type,
        likes: message.likes,
        timestamp: setTimeValue(message.timestamp),
        text: message.text,
        image: message.image,
        comment_count: message.comment_count,
        comments: message.comments,
        poll: message.poll,
        tips_total: message.tips_total,
        is_favorite: message.is_favorite
    }
  })
});

const setTimeValue = (timestamp) => {
  let date = new Date(timestamp);
  return date.getTime();
}

export const getMessages = () => {
  return (dispatch) => {
    firebase_service.getMessages().then(messages => {
      dispatch(addMessages('ADD_POSTS', messages));
    });
  }
}