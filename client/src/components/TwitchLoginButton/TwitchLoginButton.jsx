import { useContext } from 'react';
import AuthenticationContext from '../../context/AuthenticationContext';
import style from './TwitchLoginButton.module.css';

function TwitchLoginButton() {
    const authentication = useContext(AuthenticationContext);

    if(authentication.isAuthenticated){
        return (
            <button className={style['twitch-login-button']} onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/logout`}>
                Logout
            </button>
        )
    }

    return (
        <button className={style['twitch-login-button']} onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/login`}>
            Login with Twitch
        </button>
    );
}

export default TwitchLoginButton;