import { useContext } from 'react';
import style from './AddGameButton.module.css';
import GameListReloadContext from '../../../context/GameListReloadContext.tsx';

function AddGameButton({ isFocused }: client.props.IButton){
    const { reloadTrigger, setReloadTrigger} = useContext(GameListReloadContext);

    const handleClick = async () => {
        const game = {
            id : parseInt((document.getElementById('game-id-input') as HTMLInputElement)?.value || '0')
        }
    
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/apps/add`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(game)
        });

        if (response.status === 201) {
            setReloadTrigger(!reloadTrigger);
        }
    }
    
    return(
        <button className={`${style['add-game-button']} ${isFocused ? style.focused : ''}`} onClick={handleClick}>
            Add Game
        </button>
    );
}

export default AddGameButton;