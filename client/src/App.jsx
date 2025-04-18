import { useState, useEffect } from 'react';
import AuthenticationContext from './context/AuthenticationContext.tsx';
import GameListReloadContext from './context/GameListReloadContext.tsx';
import Header from './components/Header/Header.jsx';
import Section from './components/Section/Section.jsx';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    
    useEffect(() => {
        (async () => {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/authenticate`, { credentials: "include" });
            setIsAuthenticated(response.ok);
        })();
    }, []);

    return(
        <AuthenticationContext.Provider value = {{ isAuthenticated }}>
            <GameListReloadContext.Provider value = {{ reloadTrigger, setReloadTrigger }}>
                <Header />
                <Section />
            </GameListReloadContext.Provider>
        </AuthenticationContext.Provider>
    );
}

export default App