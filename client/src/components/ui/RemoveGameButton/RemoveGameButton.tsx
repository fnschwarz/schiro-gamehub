import { useState, useContext } from 'react';
import style from './RemoveGameButton.module.css';
import { API_BASE_URL } from '../../../configs/api.config.ts';
import useAuth from '../../../hooks/useAuth.ts';
import GameListReloadContext from '../../../context/GameListReloadContext.tsx';

function RemoveGameButton({ id }: client.props.GameId){
    const [isOpen, setIsOpen] = useState(false)
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
        return (
            <>
                <button className={style['remove-game-button']} onClick={() => setIsOpen(true)}>
                    &times;
                </button>
    
                {isOpen && (
                    <>
                        <div className={style['dialog__backdrop']} onClick={() => setIsOpen(false)}>
                            <div className={style['dialog']}>
                                <div className={style['dialog__panel']}>
                                    <h2 className={style['dialog__title']}>Are you sure?</h2>
                                    <p className={style['dialog__description']}>
                                        This will delete the game from the list.
                                    </p>
                                    <div className={style['dialog__buttons']}>
                                        <button className={style['dialog__button-cancel']} onClick={() => setIsOpen(false)}>Cancel</button>
                                        <button className={style['dialog__button-delete']} onClick={() => {setIsOpen(false); handleClick()}}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default RemoveGameButton;