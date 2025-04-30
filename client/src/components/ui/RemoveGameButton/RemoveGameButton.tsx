import { useContext } from 'react';
import style from './RemoveGameButton.module.css';
import { API_BASE_URL } from '../../../configs/api.config.ts';
import useAuth from '../../../hooks/useAuth.ts';
import GameListReloadContext from '../../../context/GameListReloadContext.tsx';

function RemoveGameButton({ id }: client.props.IGameId){
    const { data: isAuthenticated } = useAuth();
    const { reloadTrigger, setReloadTrigger} = useContext(GameListReloadContext);

    const handleClick = async () => {
        const app = {
            id: id,
        };

        const response = await fetch(`${API_BASE_URL}/api/games`, {
            method: 'DELETE',
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

export default RemoveGameButton;