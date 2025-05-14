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
    }, [refetch, reloadTrigger]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (games.length === 0) {
        return (
            <div className={style['missing-game-list']}>
                <p>Keine Spiele? 🥺</p>
                <br />
                <p>Das glaub ich nicht. <a href='https://www.twitch.tv/xschiro'>Schau lieber nochmal nach.</a></p>
            </div>
        );
    }

    return (
        <div className={style['game-list']}>
            {games.map((game) => (
                <GameCard
                    key = {game.id}
                    id = {game.id}
                    name = {game.name}
                    steam_link = {game.steam_link}
                    header_image = {game.header_image}
                />
            ))}
        </div>
    );
}

export default GameList;
