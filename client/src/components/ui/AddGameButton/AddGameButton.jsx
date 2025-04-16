import { useContext } from 'react';
import style from './AddGameButton.module.css';
import PropTypes from 'prop-types';
import AuthenticationContext from '../../../context/AuthenticationContext.tsx';
import GameListReloadContext from '../../../context/GameListReloadContext.tsx';

function AddGameButton({ isFocused }){
    const { isAuthenticated } = useContext(AuthenticationContext);
    const { reloadTrigger, setReloadTrigger} = useContext(GameListReloadContext);

    const handleClick = async (evt) => {
        const game = {
            "id" : parseInt(document.getElementById('game-id-input').value)
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

    if (isAuthenticated) {
        return(
            <button className={`${style['add-game-button']} ${isFocused ? style.focused : ''}`} onClick={(evt) => handleClick(evt)}>
                Add Game
            </button>
        );
    }
}

AddGameButton.propTypes = {
    isFocused: PropTypes.bool.isRequired,
}

export default AddGameButton;