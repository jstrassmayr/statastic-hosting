import React from 'react';
import GameMgmt from './GameMgmt';

import { signInWithGoogle } from "./services/firestore";


function App() {
    return (
        <div>
            <GameMgmt/>

            {/* <div className="login-buttons">
                <button className="login-provider-button" onClick={signInWithGoogle}>
                    <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/>
                    <span> Continue with Google</span>
                </button>
            </div> */}
        </div>
    );
}

export default App;