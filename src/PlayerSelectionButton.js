import React from 'react';

class PlayerSelectionButton extends React.Component {
    render() {
      return (
        <button 
          className="playerSelectionButton"
          onClick={() => this.props.onClick()}>
            {this.props.playerName} {this.props.jerseyNr}
        </button>
      );
    }
}

export default PlayerSelectionButton;