import { ReactElement, useContext, useState } from 'react';
import style from './AddGameButton.module.css';
import { API_BASE_URL } from '../../../configs/api.config.ts';
import Icon from '@mdi/react';
import { mdiAlertBox } from '@mdi/js';
import GameListReloadContext from '../../../context/GameListReloadContext.tsx';

function AddGameButton({ isFocused }: client.props.Button){
    const [errorIcon, setErrorIcon] = useState<ReactElement | null>(null);
    const [errorMessage, setErrorMessage] = useState<ReactElement | null>(null);
    const { reloadTrigger, setReloadTrigger} = useContext(GameListReloadContext);

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

    return(
        <div className={style['add-game-button-container']}>
            <button className={`${style['add-game-button']} ${isFocused ? style.focused : ''}`} onClick={handleClick}>
                Add Game
            </button>
            <div className={style['add-game-button-error']}>
                {errorIcon}
                {errorMessage}
            </div>
        </div>
    );
}

export default AddGameButton;
