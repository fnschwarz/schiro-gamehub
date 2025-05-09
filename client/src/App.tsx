import { useState } from 'react';
import GameListReloadContext from './context/GameListReloadContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.tsx';

const queryClient = new QueryClient();

function App() {
    const [reloadTrigger, setReloadTrigger] = useState(false);

    return(
        <GameListReloadContext.Provider value = {{ reloadTrigger, setReloadTrigger }}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home />}/>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </GameListReloadContext.Provider>
    );
}

export default App;
