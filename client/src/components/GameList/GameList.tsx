import { useContext, useEffect } from 'react';
import style from './GameList.module.css';
import GameListReloadContext from '../../context/GameListReloadContext.tsx';
import useGames from '../../hooks/useGames.ts';
import GameCard from '../GameCard/GameCard.tsx';

function GameList() {
    const { reloadTrigger } = useContext(GameListReloadContext);
    const { data: games = [], isLoading, refetch } = useGames();

    useEffect(() => {
        refetch();
    }, [reloadTrigger]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={style['game-list']}>
            {games.map((game) => (
                <GameCard
                    key={game.id}
                    id={game.id}
                    title={game.name}
                    img={game.header}
                    link={game.link}
                    alt={`${game.name}`}
                />
            ))}
        </div>
    );
}

export default GameList;