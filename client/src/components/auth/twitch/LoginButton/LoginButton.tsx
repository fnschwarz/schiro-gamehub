import style from './LoginButton.module.css';
import Icon from '@mdi/react';
import { mdiTwitch } from '@mdi/js';
import useAuth from '../../../../hooks/useAuth.ts';

function LoginButton() {
    const { data: isAuthenticated } = useAuth();

    if(isAuthenticated){
        return (
            <a href={`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`}>
                <button className={style['login-button']} onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`}>
                    Logout
                </button>
            </a>
        )
    }

    return (
        <a href={`${import.meta.env.VITE_BACKEND_URL || ''}/api/auth/twitch`}>
            <button className={style['login-button']}>
                <Icon path={mdiTwitch} size={0.9} />
                Login with Twitch
            </button>
        </a>
    );
}

export default LoginButton;