import style from './LoginButton.module.css';
import { API_BASE_URL } from '../../../../config/api.config.ts';
import Icon from '@mdi/react';
import { mdiTwitch } from '@mdi/js';
import useAuth from '../../../../hooks/useAuth.ts';

function LoginButton() {
    const { data: isAuthenticated } = useAuth();

    if(isAuthenticated){
        return (
            <a href={`${API_BASE_URL}/api/auth/logout`}>
                <button className={style['login-button']}>
                    Logout
                </button>
            </a>
        )
    }

    return (
        <a href={`${API_BASE_URL}/api/auth/twitch`}>
            <button className={style['login-button']}>
                <Icon path={mdiTwitch} size={0.9} />
                Login with Twitch
            </button>
        </a>
    );
}

export default LoginButton;