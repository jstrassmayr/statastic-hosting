import React, { useState } from 'react';
import './CreateGame.css';
import * as FirestoreService from '../../services/firestore';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function CreateGame(props) {

    const { onCreate, userId } = props;

    const [ error, setError ] = useState();

    function createGame(e) {
        e.preventDefault();
        setError(null);

        const userName = document.createGameForm.userName.value;
        if (!userName) {
            setError('user-name-required');
            return;
        }

        FirestoreService.createGame(userName, userId).then(docRef => {
            onCreate(docRef.id, userName);
        })
        .catch(reason => setError('create-list-error'));
    }

    return (
        <div>
            <header>
                <h1>Welcome to Statastic Basketball Web!</h1>
            </header>
            <div className="create-container">
                <div>
                    <form name="createGameForm">
                        <p><label>What is your name?</label></p>
                        <p><input type="text" name="userName" /></p>
                        <ErrorMessage errorCode={error}></ErrorMessage>
                        <p><button onClick={createGame}>Create a new game</button></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateGame;