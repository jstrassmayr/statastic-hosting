import React from 'react';

class ActionRecordButton extends React.Component {
    
    render() {
      return (
        <button 
          className="actionRecordButton"
          style={{backgroundColor: this.props.selected?"#3663BF":"#7A9FBF"}}
          onClick={() => { this.props.onClick(); }}>
            {this.props.label}
        </button>
      );
    }

}

export default ActionRecordButton;