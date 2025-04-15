import style from './LoginButton.module.css';
import { useContext } from 'react';
import AuthenticationContext from '../../../../context/AuthenticationContext';


function LoginButton() {
    const authentication = useContext(AuthenticationContext);

    if(authentication.isAuthenticated){
        return (
            <button className={style['login-button']} onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/logout`}>
                Logout
            </button>
        )
    }

    return (
        <button className={style['login-button']} onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/login`}>
            Login with Twitch
        </button>
    );
}

export default LoginButton;