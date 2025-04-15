import { useState } from 'react';
import style from './Section.module.css';
import IdInput from '../IdInput/IdInput.jsx';
import GameList from '../GameList/GameList.jsx';

function Section() {
    const [reloadCardComponents, setReloadCardComponents] = useState(false);
    const [inputFieldValue, setInputFieldValue] = useState('');

    const handleReloadCardComponents = () => {
        setReloadCardComponents(!reloadCardComponents);
        setInputFieldValue('')
    };

    return (
        <div className={style.section}>
            <IdInput
                reloadCardComponentsFunc={handleReloadCardComponents} 
                value={inputFieldValue} 
                setValue={setInputFieldValue} 
            />
            <div className={style.apps}>
                <GameList reloadCardComponentsFunc={handleReloadCardComponents} reloadTrigger={reloadCardComponents} />
            </div>
        </div>
    );
}

export default Section;