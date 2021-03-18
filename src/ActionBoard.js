import React from 'react';
import './index.css';

class ActionBoard extends React.Component {
    actionScore3 = { id: 0, name: "Score3", labelShort: "+3", labelLong: "Score 3"};
    actionAttempt3 = { id: 1, name: "Attempt3", labelShort: "~3", labelLong: "Attempt 3"};
    actionScore2 = { id: 2, name: "Score2", labelShort: "+2", labelLong: "Score 2"};
    actionAttempt2 = { id: 3, name: "Attempt2", labelShort: "~2", labelLong: "Attempt 2"};
    actionScore1 = { id: 4, name: "Score1", labelShort: "+1", labelLong: "Score 1"};
    actionAttempt1 = { id: 5, name: "Attempt1", labelShort: "~1", labelLong: "Attempt 1"};
    actionFoul = { id: 6, name: "Foul", labelShort: "FOL", labelLong: "Foul"};
    actionDefensiveRebound = { id: 7, name: "DefensiveRebound", labelShort: "DRB", labelLong: "Defensive Rebound"};
    actionOffensiveRebound = { id: 8, name: "OffensiveRebound", labelShort: "ORB", labelLong: "Offensive Rebound"};
    actionAssist = { id: 9, name: "Assist", labelShort: "AST", labelLong: "Assist"};
    actionBlock = { id: 10, name: "Block", labelShort: "BLK", labelLong: "Block"};
    actionSteal = { id: 11, name: "Steal", labelShort: "STL", labelLong: "Steal"};
    actionTurnOver = { id: 12, name: "TurnOver", labelShort: "TO", labelLong: "Turn Over"};
    actionAwesome = { id: 13, name: "Awesome", labelShort: "A!", labelLong: "Awesome"};
    
    handleActionRecordButtonClick(action) {
        if (this.props.selectedAction?.id === action.id)
            this.props.onSelectedActionChanged(null);
        else
            this.props.onSelectedActionChanged(action);
    }    

    renderActionRecordButton(action) {
        return (
            <button 
                className="actionRecordButton"
                style={{backgroundColor: this.props.selectedAction?.id === action.id?"#3663BF":"#7A9FBF"}}
                onClick={() => { this.handleActionRecordButtonClick(action); }}>
                {action.labelShort}
            </button>
        );
    }


    render() {        
        return (
            <div>
                <div className="board-row">
                    {this.renderActionRecordButton(this.actionScore3)}{this.renderActionRecordButton(this.actionScore2)}{this.renderActionRecordButton(this.actionScore1)}
                </div>
                <div className="board-row">
                    {this.renderActionRecordButton(this.actionAttempt3)}{this.renderActionRecordButton(this.actionAttempt2)}{this.renderActionRecordButton(this.actionAttempt1)}
                </div>
                <div className="board-row">
                    {this.renderActionRecordButton(this.actionOffensiveRebound)}{this.renderActionRecordButton("...")}{this.renderActionRecordButton(this.actionDefensiveRebound)}
                </div>
                <div className="board-row">
                    {this.renderActionRecordButton(this.actionAssist)}{this.renderActionRecordButton(this.actionBlock)}{this.renderActionRecordButton(this.actionSteal)}
                </div>
                <div className="board-row">
                    {this.renderActionRecordButton(this.actionTurnOver)}{this.renderActionRecordButton(this.actionFoul)}{this.renderActionRecordButton(this.actionAwesome)}
                </div>
            </div>
        );
    }
  }

  
export default ActionBoard;