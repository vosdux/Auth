import React, { memo, useEffect, useState } from 'react';
import { formatDate, getTimeRemaining, renderArray } from '../../utils';

import './UserData.scss';

const UserData = ({ data: { preferred_username, exp, iat, auth_time, email_verified, realm_access }, onLogut, refresh }) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timerColor, setTimerColor] = useState("black");
    const [isTimerStart, setisTimerStart] = useState(false);

    useEffect(() => {
        if (realm_access && realm_access.roles) {
            if (realm_access.roles.find(role => role === "SCOPE_read")) {
                setTimerColor("red");
            }
            if (realm_access.roles.find(role => role === "SCOPE_write")) {
                setTimerColor("green");
            }
        }
    }, [realm_access]);

    useEffect(() => {
        let timeinterval;
        const updateClock = (exp) => {
            timeinterval = setInterval(() => {
                const t = getTimeRemaining(formatDate(exp));
                setHours(t.hours);
                setMinutes(t.minutes);
                setSeconds(t.seconds);
                setisTimerStart(true)
                if (t.total <= 0) {
                    clearInterval(timeinterval);
                    refresh();
                }
            }, 1000);
        }

        if (exp) {
            updateClock(exp);
        }

        return () => clearInterval(timeinterval);

    }, [exp, refresh]);

    return (
        <>
            <div className='info-container'>
                <p className='info-text'><strong>Логин:</strong> {preferred_username || ''}</p>
                <p className='info-text'><strong>Время входа:</strong> {auth_time && formatDate(auth_time)}</p>
                <p className='info-text'><strong>Подтверждение почты:</strong> {email_verified ? 'Да' : 'Нет'}</p>
                <p className='info-text'><strong>Роли:</strong> {realm_access && realm_access.roles && renderArray(realm_access.roles)}</p>
                <p className='info-text'><strong>Время cоздания:</strong> {iat && formatDate(iat)}</p>
                <p className='info-text'><strong>Время протухания:</strong> {exp && formatDate(exp)}</p>
                <p className='info-text' style={{ color: timerColor }}><strong className='black-text'>Таймер:</strong> {isTimerStart && `${hours}:${minutes}:${seconds}`}</p>
            </div>
            <button onClick={onLogut}>logout</button>
        </>
    );
};

export default memo(UserData);
