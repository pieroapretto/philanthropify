import { firebase } from "../firebase/firebase";

class FireBaseService {
    saveImage(file) {
        return new Promise((resolve, reject) => {
            const uploadImageTask = firebase.storage().ref('images/' + file.name).put(file);
            
            uploadImageTask.on(firebase.storage.TaskEvent.STATE_CHANGED ,
                function (snapshot) {
                    console.info(snapshot.state);
                },
                function (err) {
                    reject('Error posting image to database. Error code: ' + err.code);
                },
                function () {
                    uploadImageTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    }
}

export const firebase_service = new FireBaseService();