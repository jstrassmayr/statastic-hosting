import React from 'react';
import './PlayerButton.css'

function PlayerButton(props) {        

    const { team, player, width, isSelected, fontSize, onClick } = props;
    
    if (team && player) {
        const jerseyMainImgUrl = "https://statastic-c182d.web.app/images/livetracking/jersey_main_" + team.mainColor + ".png";
        const jerseyOverlayImgUrl = "https://statastic-c182d.web.app/images/livetracking/jersey_overlay_" + team.overlayColor + ".png";

        return (
            <div className="jerseyDiv" 
                onClick={() => onClick()}
                style={{backgroundColor: isSelected ? "#3663BF":"transparent"}}>
                <img src={jerseyMainImgUrl} alt="" width={width} style={{maxWidth: "100%"}}/>
                <img className="overlayCentered" src={jerseyOverlayImgUrl} alt="" width={width} style={{maxWidth: "100%"}}/>
                <div className="overlayCentered" style={{fontSize: fontSize, color: team.overlayColor}}>{player.jerseyNr} {isSelected}</div>
            </div>
        );        
    }
    return (null);
}

PlayerButton.defaultProps = {
    width: 96,
    fontSize: '25px',
    isSelected: false
};

export default PlayerButton;