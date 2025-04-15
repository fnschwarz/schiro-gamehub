import { useState } from 'react';
import style from './Section.module.css';
import GameIdInput from '../GameIdInput/GameIdInput.jsx';
import GameList from '../GameList/GameList.jsx';

function Section() {
    const [reloadCardComponents, setReloadCardComponents] = useState(false);
    const [inputFieldValue, setInputFieldValue] = useState('');

    const handleReloadCardComponents = () => {
        setReloadCardComponents(!reloadCardComponents);
        setInputFieldValue('')
    };

    return (
        <div className={style['section-container']}>
            <GameIdInput
                reloadCardComponentsFunc={handleReloadCardComponents} 
                value={inputFieldValue} 
                setValue={setInputFieldValue} 
            />
            <div className={style['game-list-wrapper']}>
                <GameList reloadCardComponentsFunc={handleReloadCardComponents} reloadTrigger={reloadCardComponents} />
            </div>
        </div>
    );
}

export default Section;