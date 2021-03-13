import React from 'react';
import ActionRecordButton from './ActionRecordButton.js';
import './index.css';
import PlayerSelectionButton from './PlayerSelectionButton.js';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAction: null
            ,selectedTeam: null
            ,selectedPlayer: null
            ,actionList: []
        };
    }


    
    commitAction() {
        const {selectedAction, selectedTeam, selectedPlayer, actionList} = this.state;  // this is a nice shortening help when using state members
        if (selectedPlayer && selectedAction) {        
            actionList.push({player: selectedPlayer, action: selectedAction, team: selectedTeam});
            if (selectedAction.name === "Score3" || selectedAction.name === "Score2" || selectedAction.name === "Score1") {
                var scoreValue = selectedAction.name.charAt(5);
                this.props.onScoreChange(selectedTeam, scoreValue);
            }
            this.setState({
                selectedAction: null,
                selectedPlayer: null,
                selectedTeam: null
            });
        }        
    }

    
    handleActionRecordButtonClick(action) {
        if (this.state.selectedAction?.id === action.id)
            this.setState({selectedAction: null}, this.commitAction);   // the state is changes Async -> hand over a function to be called after it actually is updated. See https://stackoverflow.com/questions/30782948/why-calling-react-setstate-method-doesnt-mutate-the-state-immediately      
        else
            this.setState({selectedAction: action}, this.commitAction);                   
    }    

    handlePlayerSelectionClick(player, team) {        
        if (this.state.selectedPlayer?.id === player.id)    // the state is changes Async -> hand over a function to be called after it actually is updated. See https://stackoverflow.com/questions/30782948/why-calling-react-setstate-method-doesnt-mutate-the-state-immediately      
            this.setState({
                selectedPlayer: null,
                selectedTeam: null
            }, this.commitAction);
        else
            this.setState({
                selectedPlayer: player,
                selectedTeam: team
            }, this.commitAction);
    }

    renderActionRecordButton(action) {
        return (
            <ActionRecordButton 
                label={action.labelShort}
                selected={this.state.selectedAction?.id === action.id}
                onClick={() => this.handleActionRecordButtonClick(action)}
            />
        );
    }


    renderPlayerRow(team) {
        return (
            <div>                
                {team.players.map(player => (
                    <PlayerSelectionButton 
                        playerName={player.name} 
                        jerseyNr={player.jerseyNr}
                        selected={this.state.selectedPlayer?.id === player.id}
                        onClick={() => this.handlePlayerSelectionClick(player, team)}
                    />
                ))}
            </div>
        );
    }

    renderActionList() {
        const aList = [];
        this.state.actionList.forEach(commitedAction => {
            aList.push(
                <div>
                    - {commitedAction.action.labelLong} by {commitedAction.player.name}
                </div>
            );
        });

        return (
            <div>
                <b>All events</b>
                {aList}
            </div>
        );
    }

    render() {
        
        const actionScore3 = { id: 0, name: "Score3", labelShort: "+3", labelLong: "Score 3"};
        const actionAttempt3 = { id: 1, name: "Attempt3", labelShort: "~3", labelLong: "Attempt 3"};
        const actionScore2 = { id: 2, name: "Score2", labelShort: "+2", labelLong: "Score 2"};
        const actionAttempt2 = { id: 3, name: "Attempt2", labelShort: "~2", labelLong: "Attempt 2"};
        const actionScore1 = { id: 4, name: "Score1", labelShort: "+1", labelLong: "Score 1"};
        const actionAttempt1 = { id: 5, name: "Attempt1", labelShort: "~1", labelLong: "Attempt 1"};
        const actionFoul = { id: 6, name: "Foul", labelShort: "FOL", labelLong: "Foul"};
        const actionDefensiveRebound = { id: 7, name: "DefensiveRebound", labelShort: "DRB", labelLong: "Defensive Rebound"};
        const actionOffensiveRebound = { id: 8, name: "OffensiveRebound", labelShort: "ORB", labelLong: "Offensive Rebound"};
        const actionAssist = { id: 9, name: "Assist", labelShort: "AST", labelLong: "Assist"};
        const actionBlock = { id: 10, name: "Block", labelShort: "BLK", labelLong: "Block"};
        const actionSteal = { id: 11, name: "Steal", labelShort: "STL", labelLong: "Steal"};
        const actionTurnOver = { id: 12, name: "TurnOver", labelShort: "TO", labelLong: "Turn Over"};
        const actionAwesome = { id: 13, name: "Awesome", labelShort: "A!", labelLong: "Awesome"};



        return (
            <div>
                Selected ActionRecordButton: {this.state.selectedAction?.labelLong}<br/>
                Selected Player: {this.state.selectedPlayer?.name} {this.state.selectedTeam?.name}<br/>

                <div className="player-row">
                    {this.renderPlayerRow(this.props.teamHome)}
                </div>

                <div className="board-row">
                    {this.renderActionRecordButton(actionScore3)}{this.renderActionRecordButton(actionScore2)}{this.renderActionRecordButton(actionScore1)}
                </div>
                <div className="board-row">
                    {this.renderActionRecordButton(actionAttempt3)}{this.renderActionRecordButton(actionAttempt2)}{this.renderActionRecordButton(actionAttempt1)}
                </div>
                <div className="board-row">
                    {this.renderActionRecordButton(actionOffensiveRebound)}{this.renderActionRecordButton("...")}{this.renderActionRecordButton(actionDefensiveRebound)}
                </div>
                <div className="board-row">
                    {this.renderActionRecordButton(actionAssist)}{this.renderActionRecordButton(actionBlock)}{this.renderActionRecordButton(actionSteal)}
                </div>
                <div className="board-row">
                    {this.renderActionRecordButton(actionTurnOver)}{this.renderActionRecordButton(actionFoul)}{this.renderActionRecordButton(actionAwesome)}
                </div>

                <div className="player-row">
                    {this.renderPlayerRow(this.props.teamAway)}
                </div>


                <div>
                    {this.renderActionList()}
                </div>
            </div>
        );
    }
  }

  
export default Board;