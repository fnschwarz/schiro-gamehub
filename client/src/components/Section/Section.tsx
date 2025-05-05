import style from './Section.module.css';
import GameIdInput from '../GameIdInput/GameIdInput.tsx';
import GameList from '../GameList/GameList.tsx';

function Section() {
    return (
        <div className={style.section}>
            <GameIdInput />
            <GameList />
        </div>
    );
}

export default Section;