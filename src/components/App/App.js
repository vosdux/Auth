import React from 'react';
import MainScreen from '../../screens/MainScreen';

import './App.scss';

export const AuthContext = React.createContext();

const App = () => {
    return (
        <div className="container">
            <div className="card">
                <MainScreen />
            </div>
        </div>
    );
}

export default App;
