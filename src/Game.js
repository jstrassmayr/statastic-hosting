import React from 'react';
import Board from './Board.js';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scoreHome: 0,
            scoreAway: 0
        };
    }

    handleScoreChange(teamLabel, score) {        
        if (teamLabel === "Home") 
            this.setState({scoreHome: this.state.scoreHome + parseInt(score)});
        
        if (teamLabel === "Away") 
            this.setState({scoreAway: this.state.scoreAway + parseInt(score)});
    }

    render() {
        return (
        <div className="game">
            <div className="game-board">
                {this.state.scoreHome} : {this.state.scoreAway}
                <Board onScoreChange={(teamLabel, score) => this.handleScoreChange(teamLabel, score)}/>
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
        );
    }
}


export default Game;