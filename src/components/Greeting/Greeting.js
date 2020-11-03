import React, { memo } from 'react';

import './Greeting.scss';

const Greeting = ({ onLogin }) => {
    return (
        <>
            <div className='greeting'>Здесь должно быть оригинальное приветствие</div>
            <button onClick={onLogin}>login</button>
        </>
    );
};

export default memo(Greeting);
