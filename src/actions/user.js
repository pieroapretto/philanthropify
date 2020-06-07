import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = ({
    uid,
    displayName=''
  }={}) => ({
    type: 'LOGIN',
    user: {
      uid,
      name:displayName
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
