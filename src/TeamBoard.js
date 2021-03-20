import React from 'react';
import PlayerButton from './components/PlayerButton/PlayerButton';
import './index.css';

class TeamBoard extends React.Component {
        
    handlePlayerButtonClick(player) {
        if (this.props.selectedPlayer?.id === player.id)
            this.props.onSelectedPlayerChanged(null)
        else
            this.props.onSelectedPlayerChanged(player)
    }    

    renderButton(player) {
        return (            
            <PlayerButton
                key={player.id}
                team={this.props.team}
                player={player}
                width="48" height="78" fontSize="20px"
                isSelected={this.props.selectedPlayer?.id === player.id}
                onClick={() => { this.handlePlayerButtonClick(player); }}
                />
        );
    }

    render() {        
        return (
            <div style={{float: 'auto'}}>
                {this.props.team.players.map(player => (
                    this.renderButton(player)
                ))}
            </div>            
        );
    }
  }
  
export default TeamBoard;