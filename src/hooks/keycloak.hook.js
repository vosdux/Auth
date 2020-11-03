import { useCallback, useEffect, useState } from 'react';
import * as Keycloak from '../../node_modules/keycloak-js';

export const useKeycloak = () => {
    const [keycloak, setKeycloak] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let fetchedKeycloak = await new Keycloak({
                    url: 'https://84.201.176.223:8443/auth',
                    realm: 'testRealm',
                    clientId: 'test'
                });
                setAuthLoading(true);
                await fetchedKeycloak.init({
                    onLoad: 'check-sso',
                });
                setKeycloak(fetchedKeycloak);
                setAuthLoading(false);
            } catch (error) {
                console.log(error)
                setAuthLoading(false);
                alert(error.message);
            }
        };

        fetchData();
    }, []);


    const refresh = useCallback(async () => {
        await keycloak.updateToken(5);
        setKeycloak({ ...keycloak });
    }, [keycloak]);

    const login = useCallback(async () => {
        await keycloak.login({
            redirectUri: 'http://localhost:3000/login',
        });
        setKeycloak({ ...keycloak });
    }, [keycloak]);

    const logout = useCallback(async () => {
        await keycloak.logout();
        setKeycloak({ ...keycloak });
    }, [keycloak]);

    return {
        keycloak,
        authLoading,
        refresh,
        login,
        logout
    };
};