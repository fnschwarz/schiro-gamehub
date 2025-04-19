import style from './Section.module.css';
import GameIdInput from '../GameIdInput/GameIdInput.tsx';
import GameList from '../GameList/GameList.tsx';

function Section() {
    return (
        <div className={style['section-container']}>
            <GameIdInput />
            <div className={style['game-list-wrapper']}>
                <GameList />
            </div>
        </div>
    );
}

export default Section;