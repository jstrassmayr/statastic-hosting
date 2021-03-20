import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBd8cyVgr-x73ElngxK_dMeeAz1TjpiVqI",
    authDomain: "statastic-c182d.firebaseapp.com",
    databaseURL: "https://statastic-c182d.firebaseio.com",
    projectId: "statastic-c182d",
    storageBucket: "statastic-c182d.appspot.com",
    messagingSenderId: "849867232741",
    appId: "1:849867232741:web:81e2e7c38654aaa1664b0c",
    measurementId: "G-RLE0HXEXHJ"
};

if (!firebase.apps.length) 
    firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const gameCollectionName = 'gameHHH';
const actionCollectionName = 'actionHHH';


export const authenticateAnonymously = () => {
    return firebase.auth().signInAnonymously();
};

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

// export const getGameActions = gameDocId => {
//     return db.collection(gameCollectionName)
//         .doc(gameDocId)
//         .collection(actionCollectionName)
//         .get();
// }

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