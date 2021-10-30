import React, { useState, useEffect } from 'react';
import './GameList.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import * as FirestoreService from '../../services/firestore';

function GameList(props) {

    const { userId } = props;

    const [ games, setGames] = useState([]);
    const [ error, setError ] = useState();

    // Use an effect hook to subscribe to the games stream and
    // automatically unsubscribe when the component unmounts.
    useEffect(() => {
        const unsubscribe = FirestoreService.streamGames(userId, {
            next: querySnapshot => {
                const updatedGames = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
                setGames(updatedGames);
            },
            error: () => setError('grocery-list-item-get-fail')
        });
        return unsubscribe;
    }, [userId, setGames]);

    const gameElements = games.map((game, i) => <li key={i}>{game.scoreHome} : {game.scoreAway}</li>);

    return (
        <div>
            <ErrorMessage errorCode={error}></ErrorMessage>
            Here is a list of your {userId} games' results:
            <div>{gameElements}</div>
        </div>
    );
}

export default GameList;