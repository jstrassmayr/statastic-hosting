import React, { useState, useEffect } from 'react';

import * as FirestoreService from './services/firestore';

import useQueryString from './hooks/useQueryString'
import EditList from './scenes/EditList/EditList';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import CreateGame from './scenes/CreateGame/CreateGame';
import JoinList from './scenes/JoinList/JoinList';

function GameNew() {
        
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
        return <EditList {...{ gameDocId, user, onCloseGame, userId}}></EditList>;
    } else if(game) {
        return (
        <div>
            <ErrorMessage errorCode={error}></ErrorMessage>
            <JoinList users={game.users} {...{gameDocId, onSelectUser, onCloseGame, userId}}></JoinList>
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


export default GameNew;