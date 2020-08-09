import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = ({
    uid,
    displayName='',
    email='',
    photoURL='images/samples/avatar_default.png',
    bannerPhoto='images/samples/banner_default.jpg',
    aboutMe=''
  }={}) => ({
    type: 'LOGIN',
    user: {
      uid,
      displayName,
      email,
      aboutMe,
      userName: displayName + uid,
      avatarPhoto: photoURL,
      bannerPhoto: bannerPhoto,
    }
});

export const startEmailLogin = (user, password) => {
  return() => {
    return firebase.auth.signInWithEmailAndPassword(user, password);
  }
};

export const startCreateUserWithEmailLogin = (user, password) => {
  return() => {
    return firebase.auth.createUserWithEmailAndPassword(user, password);
  }
};

export const startGoogleLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
