import React, { memo } from 'react';
import Greeting from '../../components/Greeting';
import Spinner from '../../components/Spinner';
import UserData from '../../components/UserData';
import { useKeycloak } from '../../hooks/keycloak.hook';

const MainScreen = () => {
    const { keycloak, authLoading, login, logout, refresh } = useKeycloak();

    if (authLoading) {
        return <Spinner />
    }

    return (
        <>
            {keycloak && keycloak.authenticated ?
                (<UserData data={keycloak.tokenParsed || {}} onLogut={logout} refresh={refresh} />) :
                <Greeting onLogin={login} />
            }
        </>
    );
};

export default memo(MainScreen);
