import { useState, useContext } from 'react';
import style from './RemoveGameButton.module.css';
import { API_BASE_URL } from '../../../configs/env.config.ts';
import useAuth from '../../../hooks/useAuth.ts';
import GameListReloadContext from '../../../context/GameListReloadContext.tsx';

function RemoveGameButton({ id }: client.props.GameId){
    const [isOpen, setIsOpen] = useState(false)
    const { data: isAuthenticated } = useAuth();
    const { reloadTrigger, setReloadTrigger} = useContext(GameListReloadContext);

    const handleClick = async () => {
        const game = {
            id: id,
        };

        const response = await fetch(`${API_BASE_URL}/api/games`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(game),
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
                        <div className={style['dialog-backdrop']} onClick={() => setIsOpen(false)}>
                            <div className={style['dialog']}>
                                <div className={style['dialog-panel']}>
                                    <h2 className={style['dialog-title']}>Sicher?</h2>
                                    <p className={style['dialog-description']}>
                                        Das Spiel wird dauerhaft von der Liste entfernt.
                                    </p>
                                    <div className={style['dialog-buttons']}>
                                        <button className={style['dialog-button-cancel']} onClick={() => setIsOpen(false)}>Abbrechen</button>
                                        <button className={style['dialog-button-delete']} onClick={() => {setIsOpen(false); handleClick()}}>L&ouml;schen</button>
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
