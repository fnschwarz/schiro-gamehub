import style from './LoginButton.module.css';
import Icon from '@mdi/react';
import { mdiTwitch } from '@mdi/js';
import useAuth from '../../../../hooks/useAuth.ts';

function LoginButton() {
    const { data: isAuthenticated } = useAuth();

    if(isAuthenticated){
        return (
            <button className={style['login-button']} onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/logout`}>
                Logout
            </button>
        )
    }

    return (
        <button className={style['login-button']} onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/twitch`}>
            <Icon path={mdiTwitch} size={0.9} />
            Login with Twitch
        </button>
    );
}

export default LoginButton;