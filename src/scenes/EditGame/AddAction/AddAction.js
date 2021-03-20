import React, { useState, useEffect } from 'react';
import './AddAction.css';
import * as FirestoreService from '../../../services/firestore';
import ActionBoard from '../../../ActionBoard';
import TeamBoard from '../../../TeamBoard';

function AddAction(props) {
 
    const { gameDocId, userId, teamHome, teamAway, onScoreChange } = props;
    const [selectedAction, setSelectedAction] = useState();
    const [selectedPlayer, setSelectedPlayer] = useState();
    const [selectedTeam, setSelectedTeam] = useState();
    
    const saveAction = React.useCallback((action, player) => {           
        FirestoreService.addGameAction(gameDocId, action, player, userId)            
            .catch(reason => { alert(reason); });        
      }, [gameDocId, userId]);

    useEffect(() => {
        if (selectedPlayer && selectedAction) {        
            if (selectedAction.name === "Score3" || selectedAction.name === "Score2" || selectedAction.name === "Score1") {
                var scoreValue = selectedAction.name.charAt(5);
                onScoreChange(selectedTeam, scoreValue);
            }
            saveAction(selectedAction, selectedPlayer);
            setSelectedAction(null);
            setSelectedPlayer(null);
            setSelectedTeam(null);
        }
     }, [saveAction, onScoreChange, selectedAction, selectedPlayer, selectedTeam]);

    return (
        <div>            
            <TeamBoard
                team={teamHome}
                selectedPlayer={selectedPlayer}
                onSelectedPlayerChanged={(player) => {setSelectedPlayer(player); setSelectedTeam(teamHome)}}/>
            <ActionBoard                
                selectedAction={selectedAction}
                onSelectedActionChanged={(action) => setSelectedAction(action)}/>                   
            <TeamBoard
                team={teamAway}
                selectedPlayer={selectedPlayer}
                onSelectedPlayerChanged={(player) => {setSelectedPlayer(player); setSelectedTeam(teamAway)}}/>
        </div>
    );
}

export default AddAction;