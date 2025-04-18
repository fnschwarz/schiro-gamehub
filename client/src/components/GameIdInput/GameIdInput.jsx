import { useState, useEffect, useContext } from 'react';
import style from './GameIdInput.module.css';
import GameListReloadContext from '../../context/GameListReloadContext.tsx';
import useAuthQuery from '../../hooks/useAuthQuery.js';
import AddGameButton from '../ui/AddGameButton/AddGameButton.jsx';

function GameIdInput(){
    const { data: isAuthenticated } = useAuthQuery();
    const { reloadTrigger } = useContext(GameListReloadContext);
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setInputValue('');
    }, [reloadTrigger]);

    const handleChange = (e) => {
        setInputValue(e.target.value.replace(/\D/g, ''));
    };

    if(isAuthenticated){
        return(
            <div className={style['game-id-input-container']}>
                <input className={style['game-id-input']}
                    id="game-id-input"
                    type="text" 
                    placeholder="STEAM APP ID"
                    value={inputValue}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <AddGameButton isFocused={isFocused} />
            </div>
        );
    }
}

export default GameIdInput;