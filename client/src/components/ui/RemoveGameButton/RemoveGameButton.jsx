import React, { useContext } from 'react';
import style from './RemoveGameButton.module.css';
import PropTypes from 'prop-types';
import useAuthQuery from '../../../hooks/useAuthQuery.ts';
import GameListReloadContext from '../../../context/GameListReloadContext.tsx';

function RemoveGameButton({ id }){
    const { data: isAuthenticated } = useAuthQuery();
    const { reloadTrigger, setReloadTrigger} = useContext(GameListReloadContext);

    const handleClick = async () => {
        const app = {
            id: parseInt(id),
        };

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/apps/remove`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(app),
        });

        if (response.ok) {
            setReloadTrigger(!reloadTrigger);
        }
    }

    if (isAuthenticated) {
        return(
            <button className={style['remove-game-button']} onClick={handleClick}>
                &times;
            </button>
        );
    }
}

RemoveGameButton.propTypes = {
    id: PropTypes.number.isRequired,
}

export default RemoveGameButton;