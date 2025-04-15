import React, { useContext } from 'react';
import style from './RemoveGameButton.module.css';
import AuthenticationContext from '../../../context/AuthenticationContext';

function RemoveGameButton({ id, reloadCardComponents }){
    const { isAuthenticated } = useContext(AuthenticationContext);

    const handleClick = async () => {
        const app = {
            id: parseInt(id),
        };

        console.log(app);

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
            reloadCardComponents();
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

export default RemoveGameButton