import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GameListReloadContext from './context/GameListReloadContext.tsx';
import Header from './components/Header/Header.jsx';
import Section from './components/Section/Section.jsx';

const queryClient = new QueryClient();

function App() {
    const [reloadTrigger, setReloadTrigger] = useState(false);

    return(
        <QueryClientProvider client={queryClient}>
            <GameListReloadContext.Provider value = {{ reloadTrigger, setReloadTrigger }}>
                <header><Header /></header>
                <section><Section /></section>
            </GameListReloadContext.Provider>
        </QueryClientProvider>
    );
}

export default App;