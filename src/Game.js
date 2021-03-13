import React from 'react';
import Board from './Board.js';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scoreHome: 0,
            scoreAway: 0,
            teamHome: { id: 0, name: "Chicago bulls", mainColor: "white", overlayColor: "green",
                players: [
                    {id: 0, name: "joey", jerseyNr: "23"},
                    {id: 1, name: "john", jerseyNr: "24"},
                    {id: 2, name: "carl", jerseyNr: "25"},
                    {id: 3, name: "mary", jerseyNr: "26"},
                    {id: 4, name: "matt", jerseyNr: "27"},
                ]
            },
            teamAway: { id: 1, name: "LA Lakers", mainColor: "violet", overlayColor: "yellow",
                players: [
                    {id: 10, name: "sepp", jerseyNr: "31"},
                    {id: 20, name: "hans", jerseyNr: "42"},
                    {id: 30, name: "karl", jerseyNr: "53"},
                    {id: 40, name: "mizi", jerseyNr: "64"},
                    {id: 50, name: "hias", jerseyNr: "77"},
                ]
            },            
            error: null,
            isLoaded: false,
            gameDocId: "002apJMD8bkmV35tnIcV",// "rPZxppy4nZHHMEbyuX1N",
            homeTeamName: null,
            awayTeamName: null,
        };
        this.onGameDocIdChange = this.onGameDocIdChange.bind(this);
        this.onClickReloadGame = this.onClickReloadGame.bind(this);
    }

    onGameDocIdChange(event) {
        this.setState({
            gameDocId: event.target.value
        });
    }
    
    onClickReloadGame() {
        this.reloadGameData();
    }

    componentDidMount() {
        this.reloadGameData();
    }

    handleScoreChange(team, score) {
        if (team.id === this.state.teamHome.id) 
            this.setState({scoreHome: this.state.scoreHome + parseInt(score)});
        else
            this.setState({scoreAway: this.state.scoreAway + parseInt(score)});
    }
    
    

    reloadGameData() {
        this.setState({ error: null, isLoaded: false });
        fetch("https://us-central1-statastic-c182d.cloudfunctions.net/getGameJson?docId="+this.state.gameDocId)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                homeTeamName: result.homeTeamName,
                awayTeamName: result.opponentTeamName
              });
            },
            // Note: it's important to handle errors here instead of a catch() block so that we don't swallow exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="game">                 
                    <div>
                        GameDocId: 
                        <input type="text" value={this.state.gameDocId} onChange={this.onGameDocIdChange}/>                            
                        <button onClick={this.onClickReloadGame}>Reload</button>
                    </div>
                    <div className="game-board">                  
                        {this.state.homeTeamName} vs. {this.state.awayTeamName} <br/>
                        {this.state.teamHome.name} {this.state.scoreHome} : {this.state.scoreAway} {this.state.teamAway.name}
                        <br/><br/>
                        <Board 
                            teamHome={this.state.teamHome}
                            teamAway={this.state.teamAway}
                            onScoreChange={(teamId, score) => this.handleScoreChange(teamId, score)}
                        />
                    </div>
                    <div className="game-info">
                        <div>{/* status */}</div>
                        <ol>{/* TODO */}</ol>
                    </div>
                </div>
            );
        }
    }
}


export default Game;