import { useState } from 'react';
import GameListReloadContext from './context/GameListReloadContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home.tsx';
import Impressum from './pages//Impressum/Impressum.tsx';
import AccessDenied from './pages/AccessDenied/AccessDenied.tsx';
import NoPage from './pages/NoPage/NoPage.tsx';

const queryClient = new QueryClient();

function App() {
    const [reloadTrigger, setReloadTrigger] = useState(false);

    return(
        <GameListReloadContext.Provider value = {{ reloadTrigger, setReloadTrigger }}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home />}/>
                        <Route path='/impressum' element={<Impressum />}/>
                        <Route path='/access-denied' element={<AccessDenied />}/>
                        <Route path='*' element={<NoPage />}/>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </GameListReloadContext.Provider>
    );
}

export default App;
