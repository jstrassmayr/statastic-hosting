import dotenv from 'dotenv'
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

dotenv.config();
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

if (!firebase.apps.length) 
    firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const gameCollectionName = 'gameHHH';
const actionCollectionName = 'actionHHH';


export const auth = firebase.auth();
export const authenticateAnonymously = () => {
    return auth.signInAnonymously();
};

const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
    return auth.signInWithPopup(googleProvider);
}




export const createGame = (userName, userId) => {
    return db.collection(gameCollectionName)
        .add({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userId,
            users: [{ 
                userId: userId,
                name: userName
            }]
        });
};

export const getGame = gameDocId => {
    return db.collection(gameCollectionName)
        .doc(gameDocId)
        .get();
};


export const streamGame = (gameDocId, observer) => {
    return db.collection(gameCollectionName)
        .doc(gameDocId)
        .onSnapshot(observer);
};



export const streamGames = (userId, observer) => {
    if (userId) {
        return db.collection(gameCollectionName)
            .where("createdBy", "==", userId)
            //.orderBy('created')       // i cannot do WHERE and ORDERBY without previously creating an index in firestore. See https://github.com/EddyVerbruggen/nativescript-plugin-firebase/issues/602#issuecomment-497663035
            .onSnapshot(observer);
    }
    return null;
};


export const streamGameActions = (gameDocId, observer) => {
    return db.collection(gameCollectionName)
        .doc(gameDocId)
        .collection(actionCollectionName)
        .orderBy('created')
        .onSnapshot(observer);
};

export const addUserToGame = (userName, gameDocId, userId) => {
    return db.collection(gameCollectionName)
        .doc(gameDocId)
        .update({
            users: firebase.firestore.FieldValue.arrayUnion({ 
                userId: userId,
                name: userName
            })
        });
};

export const updateGameScore = (gameDocId, scoreHome, scoreAway) => {
    return db.collection(gameCollectionName)
        .doc(gameDocId)
        .update({
            scoreHome: scoreHome,
            scoreAway: scoreAway
        });
};


export const addGameAction = (gameDocId, action, player, userId) => {
    return db.collection(gameCollectionName)
        .doc(gameDocId)
        .collection(actionCollectionName)
        .add({
            name: action.name,
            labelLong: action.labelLong,
            playerName: player.name,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userId
        });
};