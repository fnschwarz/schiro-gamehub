import { useState, useEffect, useContext } from 'react';
import style from './GameList.module.css';
import GameCard from '../GameCard/GameCard.jsx';
import GameListReloadContext from '../../context/GameListReloadContext.tsx';

function GameList() {
    const { reloadTrigger } = useContext(GameListReloadContext);
    const [appCards, setAppCards] = useState(['Loading...']);

    useEffect(() => {
        (async () => {
            try {

                // NOTE: get array of all apps in database through backend api
                const resAppsList = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/apps`);
                const dataAppsList = await resAppsList.json();
                const appsList = dataAppsList.apps;
                
                // NOTE: return a card component for all ids in appsList and save it in const cards
                const cards = await Promise.all(appsList.map(async (id) => {
                    const resApp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/apps/${id}`);
                    const dataApp = await resApp.json();

                    return (
                        <GameCard
                            key={dataApp.id}
                            id={dataApp.id}
                            link={dataApp.link}
                            img={dataApp.header}
                            alt={`Header of app ${dataApp.name}`}
                            title={dataApp.name}
                        />
                    );
                }));
                setAppCards(cards); // update appCards array
            } catch (error) {
                console.log(`ERROR: ${error}`);
            }
        })();
    }, [reloadTrigger]);

    return (
        <div className={style['game-list']}>
            {appCards}
        </div>
    );
}

export default GameList;