import React, { useState, useEffect } from 'react';
import './EditGame.css';
import AddAction from './AddAction/AddAction';
import ActionList from './ActionList/ActionList';
import * as FirestoreService from '../../services/firestore';

function EditGame(props) {

    const { gameDocId, user, onCloseGame, userId } = props;
    const [teamHome, setTeamHome] = useState({ 
        id: 0, 
        name: "Chicago bulls",
        mainColor: "white", 
        overlayColor: "green",
        players: [
            {id: 0, name: "joey", jerseyNr: "23"},
            {id: 1, name: "john", jerseyNr: "24"},
            {id: 2, name: "carl", jerseyNr: "25"},
            {id: 3, name: "mary", jerseyNr: "26"},
            {id: 4, name: "matt", jerseyNr: "27"},
        ]
    });
    const [teamAway, setTeamAway] = useState({ 
        id: 1, 
        name: "LA Lakers", 
        mainColor: "violet", 
        overlayColor: "yellow",
        players: [
            {id: 10, name: "sepp", jerseyNr: "31"},
            {id: 20, name: "hans", jerseyNr: "42"},
            {id: 30, name: "karl", jerseyNr: "53"},
            {id: 40, name: "mizi", jerseyNr: "64"},
            {id: 50, name: "hias", jerseyNr: "77"},
        ]
    });
    const [scoreHome, setScoreHome] = useState(0);
    const [scoreAway, setScoreAway] = useState(0);

    useEffect(() => {
        FirestoreService.updateGameScore(gameDocId, scoreHome, scoreAway);        
    }, [gameDocId, scoreHome, scoreAway]);


    function onCreateListClick(e) {
        e.preventDefault();
        onCloseGame();
    }

    function handleScoreChange(team, scoreValue) {
        if (team.id === teamHome.id)
            setScoreHome(parseInt(scoreHome)+parseInt(scoreValue));
        else
            setScoreAway(parseInt(scoreAway)+parseInt(scoreValue));        
    }

    return (
        <div>
            <header className="app-header">
                <h1>Live Game</h1>
                <p><strong>Hi {user}!</strong></p>
                <p>Add actions to the game. When someone else adds an action it will instantly appear on the list.</p>
                Score: {scoreHome} : {scoreAway}
            </header>
            <div className="edit-container">                
                <div className="add-item-column">
                    <AddAction {...{gameDocId, userId, teamHome, teamAway}} onScoreChange={(team, scoreValue) => handleScoreChange(team, scoreValue)}></AddAction>
                </div>
                <div className="list-column">
                    <ActionList {...{gameDocId}}></ActionList>
                </div>
            </div>
            <footer className="app-footer">
                <p>Share your games with others using <a href={`/?gameDocId=${gameDocId}`} target="_blank" rel="noopener noreferrer">this link</a> or <a href="/" onClick={onCreateListClick}>create a new game</a>.</p>
            </footer>    
        </div>
    );
}

export default EditGame;