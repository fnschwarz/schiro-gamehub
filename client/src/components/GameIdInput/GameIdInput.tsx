import { ReactElement, useState, useEffect, useContext } from 'react';
import style from './GameIdInput.module.css';
import { API_BASE_URL } from '../../configs/api.config';
import Icon from '@mdi/react';
import { mdiAlertBox } from '@mdi/js';
import GameListReloadContext from '../../context/GameListReloadContext.tsx';
import useAuth from '../../hooks/useAuth.ts';
import AddGameButton from '../ui/AddGameButton/AddGameButton.tsx';

function GameIdInput(){
    const { data: isAuthenticated } = useAuth();
    const { reloadTrigger, setReloadTrigger } = useContext(GameListReloadContext);
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const [errorIcon, setErrorIcon] = useState<ReactElement | null>(null);
        const [errorMessage, setErrorMessage] = useState<ReactElement | null>(null);

    useEffect(() => {
        setInputValue('');
    }, [reloadTrigger]);

    const handleChange = (e: any) => {
        setInputValue(e.target.value.replace(/\D/g, ''));
    };

    const handleClick = async () => {
        const game = {
            id : parseInt((document.getElementById('game-id-input') as HTMLInputElement)?.value || '0')
        }

        const response = await fetch(`${API_BASE_URL}/api/games`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(game)
        });

        if (response.ok) {
            setErrorIcon(null);
            setErrorMessage(null);
            setReloadTrigger(!reloadTrigger);
        } else {
            setErrorIcon(<Icon path={mdiAlertBox} size={1} />);
            setErrorMessage(<p>{(await response.json()).message}</p>);
        }
    }

    if(isAuthenticated){
        return(
            <div className={style['game-id-input-container']}>
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
                    <AddGameButton isFocused={isFocused} onClick={handleClick} />
                </div>
                <div className={style['game-id-input-error']}>
                    {errorIcon}
                    {errorMessage}
                </div>
            </div>
        );
    }
}

export default GameIdInput;
