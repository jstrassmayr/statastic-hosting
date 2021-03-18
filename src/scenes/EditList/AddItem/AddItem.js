import React, { useState, useEffect } from 'react';
import './AddItem.css';
import * as FirestoreService from '../../../services/firestore';
import ActionBoard from '../../../ActionBoard';
import TeamBoard from '../../../TeamBoard';

function AddItem(props) {

    const { gameDocId, userId, teamHome, teamAway, onScoreChange } = props;
    const [selectedAction, setSelectedAction] = useState();
    const [selectedPlayer, setSelectedPlayer] = useState();
    const [selectedTeam, setSelectedTeam] = useState();
    
    const saveAction = React.useCallback((actionLabelLong) => { 
        FirestoreService.addGameAction(actionLabelLong, gameDocId, userId)            
            .catch(reason => { alert(reason); });
      }, [gameDocId, userId]);

    useEffect(() => {
        if (selectedPlayer && selectedAction) {        
            if (selectedAction.name === "Score3" || selectedAction.name === "Score2" || selectedAction.name === "Score1") {
                var scoreValue = selectedAction.name.charAt(5);
                onScoreChange(selectedTeam, scoreValue);
            }
            saveAction(selectedAction.name + " by " + selectedPlayer.name);
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

export default AddItem;