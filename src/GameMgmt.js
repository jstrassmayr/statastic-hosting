import React, { useState, useEffect } from 'react';

import * as FirestoreService from './services/firestore';

import useQueryString from './hooks/useQueryString'
import EditGame from './scenes/EditGame/EditGame';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import CreateGame from './scenes/CreateGame/CreateGame';
import JoinGame from './scenes/JoinGame/JoinGame';

function GameMgmt() {
        
    const [user, setUser] = useState();
    const [userId, setUserId] = useState();
    const [game, setGame] = useState();    
    const [error, setError] = useState();
  
    // Use a custom hook to subscribe to the game ID provided as a URL query parameter
    const [gameDocId, setGameDocId] = useQueryString('gameDocId');

    
    // Use an effect to authenticate and load the game from the database
    useEffect(() => {
        FirestoreService.authenticateAnonymously().then(userCredential => {
        setUserId(userCredential.user.uid);
        if (gameDocId) {
            if (false) {
                FirestoreService.getGame(gameDocId).then(game => {
                    if (game.exists) {
                        setError(null);
                        setGame(game.data());
                    } else {
                        setError('game-not-found');
                        setGameDocId();
                    }
                })
                .catch(() => setError('game-get-fail'));
            }
            else {
                const unsubscribe = FirestoreService.streamGame(gameDocId, {
                    next: game => {
                        // alert(game.data().scoreHome);
                        setError(null);
                        setGame(game.data());
                    },
                    error: () => {                        
                        setError('game-not-found');
                        setGameDocId();
                    }
                });
                return unsubscribe;
            }
        }
        })
        .catch(() => setError('anonymous-auth-failed'));
    }, [gameDocId, setGameDocId]);

    function onGameCreate(gameDocId, userName) {
        setGameDocId(gameDocId);
        setUser(userName);
    }

    function onCloseGame() {
        setGameDocId();
        setGame();
        setUser();
    }

    function onSelectUser(userName) {
        setUser(userName);
        FirestoreService.getGame(gameDocId)
          .then(updatedGame => setGame(updatedGame.data()))
          .catch(() => setError('grocery-list-get-fail'));
      }
    
    // render a scene based on the current state
    if (game && user) {        
        return (
            <div>
                {game.scoreHome} {game.scoreAway}
                <EditGame {...{ game, gameDocId, user, onCloseGame, userId}}></EditGame>;
            </div>);
    } else if(game) {
        return (
        <div>            
            <ErrorMessage errorCode={error}></ErrorMessage>
            <JoinGame users={game.users} {...{gameDocId, onSelectUser, onCloseGame, userId}}></JoinGame>
        </div>
        );
    }
    return (
        <div>
            <ErrorMessage errorCode={error}></ErrorMessage>
            <CreateGame onCreate={onGameCreate} userId={userId}></CreateGame>
        </div>
    );
}


export default GameMgmt;