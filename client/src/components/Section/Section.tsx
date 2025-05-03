import style from './Section.module.css';
import GameIdInput from '../GameIdInput/GameIdInput.tsx';
import GameList from '../GameList/GameList.tsx';

function Section() {
    return (
        <div className={style.section}>
            <span className={style['game-id-button']}><GameIdInput /></span>
            <GameList />
        </div>
    );
}

export default Section;