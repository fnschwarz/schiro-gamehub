import { useState, useEffect, useContext } from 'react';
import style from './GameIdInput.module.css';
import GameListReloadContext from '../../context/GameListReloadContext.tsx';
import useAuth from '../../hooks/useAuth.ts';
import AddGameButton from '../ui/AddGameButton/AddGameButton.tsx';

function GameIdInput(){
    const { data: isAuthenticated } = useAuth();
    const { reloadTrigger } = useContext(GameListReloadContext);
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setInputValue('');
    }, [reloadTrigger]);

    const handleChange = (e: any) => {
        setInputValue(e.target.value.replace(/\D/g, ''));
    };

    if(isAuthenticated){
        return(
            <div className={style['game-id-input']}>
                <input className={style['game-id-input-input-field']}
                    id="game-id-input"
                    type="text"
                    placeholder="Steam Game ID"
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
