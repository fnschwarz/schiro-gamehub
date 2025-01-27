import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './Games.module.css';
import Card from './Card/Card.jsx';

function Games({ reloadTrigger }) {
    const [gameCards, setGameCards] = useState(['Loading...']);

    useEffect(() => {
        (async () => {
            try {

                // NOTE: get array of all games in database through backend api
                const resAppsList = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/games`);
                const dataAppsList = await resAppsList.json();
                const appsList = dataAppsList.apps;
                
                // NOTE: return a card component for all ids in appsList and save it in const cards
                const cards = await Promise.all(appsList.map(async (id) => {
                    const resApp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/games/${id}`);
                    const dataApp = await resApp.json();

                    return (
                        <Card
                            key={dataApp.id}
                            link={dataApp.link}
                            img={dataApp.header}
                            alt={`Header of game ${dataApp.name}`}
                            title={dataApp.name}
                        />
                    );
                }));
                setGameCards(cards); // update gameCards array
            } catch (error) {
                console.log(`ERROR: ${error}`);
            }
        })();
    }, [reloadTrigger]);

    return (
        <div className={style.cards}>
            {gameCards}
        </div>
    );
}

Games.propTypes = {
    reloadTrigger: PropTypes.bool.isRequired,
};

export default Games;